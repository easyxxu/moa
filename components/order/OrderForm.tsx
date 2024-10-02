"use client";
import { useState } from "react";
import Button from "../common/button/Button";
import PostCode from "./PostCode";
import { useCartCheckItems } from "@/contexts/CartContext";
import PortOne, { PaymentRequest } from "@portone/browser-sdk/v2";

export default function OrderForm() {
  const { checkedItems, price } = useCartCheckItems();

  const createOrderName = () => {
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
  const [formData, setFormData] = useState({
    orderName: createOrderName(),
    name: "",
    email: "",
    phone: "",
    postCode: "",
    defaultAddress: "",
    detailAddress: "",
    deliveryMessage: "",
    payment: "",
    orderItems: checkedItems,
    totalPrice: price.totalPrice,
  });

  const [postCodeModal, setPostCodeModal] = useState(false);

  const [phone, setPhone] = useState("");
  const handleInputTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setPhone(onlyNumbers);
  };
  const handleOpenPostCodeModal = () => {
    setPostCodeModal(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 이미 주문서가 작성되었다면 새로 생성하지 않도록 해야함
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log("#주문 생성 결과: ", data);

    const paymentId = `${crypto.randomUUID()}`;
    const paymentRequest: PaymentRequest = {
      storeId: "store-09c98e73-7dff-49ce-8683-6b5c6330d392",
      channelKey: "channel-key-4efd5333-08b9-4c38-ad43-f7c634b925a2",
      paymentId: paymentId,
      orderName: formData.orderName,
      totalAmount: formData.totalPrice,
      currency: "CURRENCY_KRW",
      payMethod: formData.payment as PaymentRequest["payMethod"],
      customer: {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        // zipcode: formData.postCode,
      },
    };

    if (data.status == 200) {
      // 결제 요청
      const res = await PortOne.requestPayment(paymentRequest);
      console.log("#결제 res: ", res);

      if (res?.code != null) {
        // 오류 발생
        return alert(res.message);
      }

      const notified = await fetch(`/api/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentId,
          order: formData,
        }),
      });
      console.log(notified);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="text-2xl font-semibold my-3">주문서 작성</p>
        <div className="flex flex-col border-t mb-3">
          <label className="order-form-label">
            주문자명
            <input
              type="text"
              id="name"
              name="name"
              className="order-form-input"
              onChange={handleInput}
              required
            />
          </label>
          <label className="order-form-label">
            이메일
            <input
              type="text"
              id="email"
              name="email"
              className="order-form-input"
              onChange={handleInput}
              required
            />
          </label>
          <label className="order-form-label">
            전화번호
            <input
              type="tel"
              id="phone"
              value={phone}
              name="phone"
              className="order-form-input"
              maxLength={11}
              onInput={handleInputTel}
              onChange={handleInput}
              required
            />
          </label>
          <label className="order-form-label">
            배송 주소
            <div className="w-4/5 [&>input]:order-form-input-tel ">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={formData.postCode}
                  readOnly
                  required
                  className="order-form-input-tel white"
                  onChange={handleInput}
                />
                <Button
                  type="button"
                  custom="whitespace-nowrap bg-primary px-10 h-10"
                  onClick={handleOpenPostCodeModal}
                >
                  우편번호 조회
                </Button>
                {postCodeModal && (
                  <PostCode
                    setFormData={setFormData}
                    setPostCodeModal={setPostCodeModal}
                  />
                )}
              </div>
              <input
                type="text"
                id="defaultAddress"
                name="defaultAddress"
                value={formData.defaultAddress}
                readOnly
                required
              />
              <input
                type="text"
                id="detailAddress"
                name="detailAddress"
                onChange={handleInput}
                required
              />
            </div>
          </label>
          <label className="order-form-label">
            배송 메시지
            <input
              type="text"
              id="deliveryMessage"
              name="deliveryMessage"
              className="order-form-input"
              onChange={handleInput}
            />
          </label>
        </div>
        <fieldset className="py-3">
          <legend className="text-lg font-semibold">결제방식</legend>
          <div className="flex gap-4 items-center border-t border-b py-3">
            <label>
              <input
                type="radio"
                name="payment"
                value="CARD"
                className="align-middle"
                onChange={handleInput}
              />
              <span className="align-middle">신용 / 체크 카드</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="VIRTUAL_ACCOUNT"
                className="align-middle"
                onChange={handleInput}
              />
              <span className="align-middle">무통장입금</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="EASY_PAY"
                className="align-middle"
                onChange={handleInput}
              />
              <span className="align-middle">카카오페이</span>
            </label>
          </div>
        </fieldset>
        <button type="submit">결제</button>
      </form>
    </>
  );
}
