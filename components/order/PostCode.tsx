import { CartItem } from "@/contexts/CartContext";
import { CSSProperties } from "react";
import DaumPostCode from "react-daum-postcode";
import { Address as DaumAddress } from "react-daum-postcode/lib/loadPostcode";

interface FormData {
  name: string;
  email: string;
  phone: string;
  postCode: string;
  defaultAddress: string;
  detailAddress: string;
  deliveryMessage: string;
  orderItems: CartItem[];
  totalPrice: number;
  orderName: string;
  payment: string;
}

interface PostCodeProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setPostCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostCode({
  setFormData,
  setPostCodeModal,
}: PostCodeProps) {
  const handleComplete = (data: DaumAddress) => {
    setFormData((prevData) => ({
      ...prevData,
      postCode: data.zonecode,
      defaultAddress: data.roadAddress,
    }));
    setPostCodeModal(false);
  };

  const handleClickOutSide = () => {
    setPostCodeModal(false);
  };

  const postCodeStyle: CSSProperties = {
    display: "block",
    position: "absolute",
    width: "50%",
    height: "50%",
    top: "0",
    left: "0",
    transform: "translate(50%, 50%)",
    zIndex: 100,
  };
  return (
    <div
      onClick={handleClickOutSide}
      className="fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10"
    >
      <DaumPostCode onComplete={handleComplete} style={postCodeStyle} />
    </div>
  );
}
