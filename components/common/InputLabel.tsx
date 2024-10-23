interface InputLabelProps {
  /** input의 type 속성 */
  type: string;
  /** label의 htmlFor 속성, input의 id 속성 */
  fieldId: string;
  /** input의 name 속성 */
  fieldName: string;
  /** input 요소를 설명하는 라벨 텍스트 */
  labelText: string;
  /** input의 value 속성 */
  value?: string | number;
  /** input의 placeholder 속성 */
  placeholder?: string;
  /** input의 스타일 */
  style: "box" | "line";
  /** input에 유효한 값이 아닐 때 에러 메세지 */
  error?: string;
  /** input이 입력됨에 따라 실행되는 이벤트 핸들러 */
  onChange?: React.ChangeEventHandler;
  /** InputLabel 전체 컨테이너에 대한 커스텀 스타일 */
  custom?: string;
}

export default function InputLabel({
  fieldName,
  value,
  fieldId,
  labelText,
  type,
  placeholder,
  style,
  error,
  onChange,
  custom,
}: InputLabelProps) {
  return (
    <div className={`flex flex-col gap-1 font-extralight ${custom}`}>
      {style === "box" ? (
        <>
          <label htmlFor={fieldId}>{labelText}</label>
          <input
            id={fieldId}
            name={fieldName}
            type={type}
            value={value}
            className="px-4 py-2 inner-box"
            placeholder={placeholder}
            required
            onChange={onChange}
          />
          <span className="text-sm text-red-600">{error}</span>
        </>
      ) : (
        <div>
          <div className="relative w-full">
            <input
              id={fieldId}
              name={fieldName}
              type={type}
              className="w-full px-2 pb-1 pt-3 border-b-2 peer bg-inherit focus:outline-none focus:border-b-font-hover"
              placeholder={placeholder}
              required
              onChange={onChange}
            />
            <label
              htmlFor={fieldId}
              className="absolute transition-all left-2 bottom-2 text-md peer-focus:text-sm peer-focus:bottom-7 peer-valid:text-sm peer-valid:bottom-7"
            >
              {labelText}
            </label>
          </div>
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}
    </div>
  );
}
