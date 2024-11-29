"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "../common/button/Button";
import PostCode from "./PostCode";

import { useCartCheckItems } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useDirectOrder } from "@/contexts/DirectOrderContext";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createOrderName } from "@/utils/createOrderName";
import PortOne, { PaymentRequest } from "@portone/browser-sdk/v2";
import { updateOrderStatus } from "@/api/orderApis";

export default function OrderForm() {
  const pathname = usePathname();
  const router = useRouter();
  const { openToast } = useToast();
  const { checkedItems, price: cartOrderPrice } = useCartCheckItems();
  const { orderItem, price: directOrderPrice } = useDirectOrder();
  const orderType = pathname.split("/").pop();
  const price = orderType === "directOrder" ? directOrderPrice : cartOrderPrice;

  const [formData, setFormData] = useState({
    orderType: orderType!,
    orderName: createOrderName(),
    name: "",
    email: "",
    phone: "",
    postCode: "",
    defaultAddress: "",
    detailAddress: "",
    deliveryMessage: "",
    payment: "",
    orderItems: orderType === "directOrder" ? [orderItem!] : checkedItems,
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

  const handleAddress = (postCode: string, defaultAddress: string) => {
    setFormData((prev) => ({ ...prev, postCode, defaultAddress }));
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

    // 주문서 생성
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const paymentId = `${crypto.randomUUID()}`;
    const paymentRequest: PaymentRequest = {
      storeId: "store-09c98e73-7dff-49ce-8683-6b5c6330d392",
      channelKey:
        formData.payment === "CARD"
          ? "channel-key-4efd5333-08b9-4c38-ad43-f7c634b925a2"
          : "channel-key-3a191af9-1a08-4e30-84f8-b904b2d8da13",
      paymentId: paymentId,
      orderName: formData.orderName,
      totalAmount: formData.totalPrice,
      currency: "CURRENCY_KRW",
      payMethod: formData.payment as PaymentRequest["payMethod"],
      customer: {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
      },
    };

    if (res.status == 200) {
      // 결제 요청
      const res = await PortOne.requestPayment(paymentRequest);

      if (res?.code != null) {
        // 오류 발생
        openToast({
          type: "ERROR",
          content: "결제를 처리하는 데 실패했습니다. 다시 시도해주세요.",
        });
        await updateOrderStatus(formData.orderName, "PAYMENT_FAILED");
        return;
      }

      const completeRes = await fetch(`/api/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentId,
          order: formData,
          orderType,
        }),
      });
      router.push(completeRes.url);
    } else {
      console.log(res);
      openToast({
        type: "ERROR",
        content: ERROR_MESSAGE.serverError,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <p className="my-3 text-2xl font-semibold">주문서 작성</p>
        <div className="flex flex-col mb-3 border-t border-gray-900">
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
              <div className="flex items-center gap-3">
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
                  style="line"
                  custom="whitespace-nowrap px-10 h-10"
                  onClick={handleOpenPostCodeModal}
                >
                  우편번호 조회
                </Button>
                {postCodeModal && (
                  <PostCode
                    handleAddress={handleAddress}
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
          <div className="flex items-center gap-4 py-3 border-t border-b">
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
                value="EASY_PAY"
                className="align-middle"
                onChange={handleInput}
              />
              <span className="align-middle">카카오페이</span>
            </label>
          </div>
        </fieldset>
        <Button type="submit" style="point" custom="px-3 py-2">
          결제
        </Button>
      </form>
    </>
  );
}
