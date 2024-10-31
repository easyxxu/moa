import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <ul className="flex flex-col">
      <li>
        <MenuItem path="/product" productCnt={2}>
          판매중인 상품
        </MenuItem>
      </li>
      <li>
        <MenuItem path="/order" notificationCnt={3}>
          주문 관리
        </MenuItem>
      </li>
      <li>
        <MenuItem path="/qa" notificationCnt={3}>
          문의 관리
        </MenuItem>
      </li>
      <li>
        <MenuItem path="/analytics">통계</MenuItem>
      </li>
      <li>
        <MenuItem path="/setting">스토어 설정</MenuItem>
      </li>
    </ul>
  );
}
