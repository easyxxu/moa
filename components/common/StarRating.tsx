"use client";

import { useRef } from "react";

interface Props {
  /** 현재 평점 */
  rating: number;
  /** 평점 변경 시 호출되는 함수 */
  onRatingChange?: (rating: number) => void;
  /** 별 아이콘 크기 */
  size: number;
  /** 평점 선택 가능 여부*/
  isEditable?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  size,
  isEditable = false,
}: Props) {
  const starsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleStarRating = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx}>
          {isEditable ? (
            <>
              <label className="hidden">
                <input
                  type="radio"
                  name="starRating"
                  value={idx + 1}
                  onChange={() => handleStarRating(idx + 1)}
                  ref={(el) => (starsRef.current[idx] = el)}
                />
                {idx + 1}
              </label>
              <svg
                width={size}
                height={size}
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => starsRef.current[idx]?.click()}
                className="cursor-pointer"
              >
                <path
                  d="M15.3251 4.48207C15.7046 3.35733 17.2954 3.35733 17.6749 4.48208L19.7901 10.7508C19.9586 11.2501 20.4242 11.5884 20.9511 11.5943L27.5667 11.6688C28.7536 11.6822 29.2452 13.1952 28.2928 13.9037L22.9845 17.8525C22.5617 18.167 22.3839 18.7143 22.541 19.2173L24.5145 25.5321C24.8686 26.6651 23.5816 27.6002 22.6134 26.9133L17.2175 23.0851C16.7878 22.7802 16.2122 22.7802 15.7825 23.0851L10.3866 26.9133C9.41843 27.6002 8.13143 26.6651 8.48551 25.5321L10.459 19.2173C10.6161 18.7143 10.4383 18.167 10.0155 17.8525L4.7072 13.9037C3.75478 13.1952 4.24637 11.6822 5.43335 11.6688L12.0489 11.5943C12.5758 11.5884 13.0414 11.2501 13.2099 10.7508L15.3251 4.48207Z"
                  fill={idx < rating ? "#FFD700" : "#C2C2C2"}
                />
              </svg>
            </>
          ) : (
            // 평점 표시 (읽기 전용)
            <svg
              width={size}
              height={size}
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3251 4.48207C15.7046 3.35733 17.2954 3.35733 17.6749 4.48208L19.7901 10.7508C19.9586 11.2501 20.4242 11.5884 20.9511 11.5943L27.5667 11.6688C28.7536 11.6822 29.2452 13.1952 28.2928 13.9037L22.9845 17.8525C22.5617 18.167 22.3839 18.7143 22.541 19.2173L24.5145 25.5321C24.8686 26.6651 23.5816 27.6002 22.6134 26.9133L17.2175 23.0851C16.7878 22.7802 16.2122 22.7802 15.7825 23.0851L10.3866 26.9133C9.41843 27.6002 8.13143 26.6651 8.48551 25.5321L10.459 19.2173C10.6161 18.7143 10.4383 18.167 10.0155 17.8525L4.7072 13.9037C3.75478 13.1952 4.24637 11.6822 5.43335 11.6688L12.0489 11.5943C12.5758 11.5884 13.0414 11.2501 13.2099 10.7508L15.3251 4.48207Z"
                fill={idx < rating ? "#FFD700" : "#C2C2C2"}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
