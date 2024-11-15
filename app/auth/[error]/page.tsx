"use client";
import { useEffect } from "react";

interface Props {
  params: {
    error: string;
  };
}
export default function AuthErrorPage({ params }: Props) {
  useEffect(() => {
    if (params.error) {
      throw new Error(params.error);
    }
  }, []);
  return <div></div>;
}
