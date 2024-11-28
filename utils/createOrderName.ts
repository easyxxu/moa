export const createOrderName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // crypto.randomUUID()로 UUID 생성 후 앞 8자리만 사용
  const shortUUID = crypto.randomUUID().split("-")[0];

  const orderName = `${year}${month}${day}_${hours}${minutes}${seconds}_${shortUUID}`;

  return orderName;
};
