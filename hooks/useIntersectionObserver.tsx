import { useCallback, useEffect, useRef } from "react";

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: "0px",
};

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
  pageEnd: boolean;
}

export default function useIntersectionObserver({
  onIntersect,
  options,
  pageEnd,
}: UseIntersectionObserverProps) {
  const targetRef = useRef(null);
  const checkIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      onIntersect();
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(checkIntersect, {
      ...defaultOption,
      ...options,
    });

    if (targetRef.current && !pageEnd) {
      io.observe(targetRef.current);
    }

    return () => io && io.disconnect();
  }, [targetRef, pageEnd]);

  return targetRef;
}
