"use client";
import { useState } from "react";
import Button from "../common/button/Button";
import PostCode from "./PostCode";

export default function OrderForm() {
  const [address, setAddress] = useState({
    postCode: "",
    defaultAddress: "",
    detailAddress: "",
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
  return (
    <form>
      <p className="text-2xl font-semibold my-3">주문서 작성</p>
      <div className="flex flex-col border-t mb-3">
        <label className="order-form-label">
          주문자명
          <input
            type="text"
            id="name"
            name="name"
            className="order-form-input"
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
                value={address.postCode}
                readOnly
                className="order-form-input-tel white"
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
                  address={address}
                  setAddress={setAddress}
                  setPostCodeModal={setPostCodeModal}
                />
              )}
            </div>
            <input
              type="text"
              id="defaultAddress"
              name="defaultAddress"
              value={address.defaultAddress}
              readOnly
            />
            <input type="text" id="detailAddress" name="detailAddress" />
          </div>
        </label>
        <label className="order-form-label">
          배송 메시지
          <input
            type="text"
            id="shippingMessage"
            name="shippingMessage"
            className="order-form-input"
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
            />
            <span className="align-middle">신용 / 체크 카드</span>
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="DEPOSIT"
              className="align-middle"
            />
            <span className="align-middle">무통장입금</span>
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="NAVERPAY"
              className="align-middle"
            />
            <span className="align-middle">네이버페이</span>
          </label>
        </div>
      </fieldset>
    </form>
  );
}
