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
  /** input의 readOnly 속성 */
  readOnly?: boolean;
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
  readOnly,
}: InputLabelProps) {
  return (
    <div className={`flex flex-col gap-1 ${custom}`}>
      {style === "box" ? (
        <>
          <label htmlFor={fieldId}>{labelText}</label>
          <input
            id={fieldId}
            name={fieldName}
            type={type}
            value={value}
            className="px-2 py-2 border border-gray-300 rounded-sm"
            placeholder={placeholder}
            required
            onChange={onChange}
            readOnly={readOnly}
          />
          <span className="text-sm text-red-600">{error}</span>
        </>
      ) : (
        <div>
          <div className={`relative w-full ${custom}`}>
            <input
              id={fieldId}
              name={fieldName}
              type={type}
              className="w-full px-1.5 pt-3 pb-1 border-b border-gray-400 peer bg-inherit focus:outline-none focus:border-b-blue-500"
              placeholder={placeholder}
              required
              onChange={onChange}
              readOnly={readOnly}
            />
            <label
              htmlFor={fieldId}
              className="absolute transition-all left-1.5 bottom-2 text-md peer-focus:text-sm peer-focus:bottom-7 peer-valid:text-sm peer-valid:bottom-7"
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
