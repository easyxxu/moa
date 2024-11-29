import { CartItem } from "@/contexts/CartContext";
import { OrderItem } from "@/contexts/DirectOrderContext";
import { CSSProperties } from "react";
import DaumPostCode from "react-daum-postcode";
import { Address as DaumAddress } from "react-daum-postcode/lib/loadPostcode";

interface PostCodeProps {
  handleAddress: (postCode: string, defaultAddress: string) => void;
  setPostCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostCode({
  handleAddress,
  setPostCodeModal,
}: PostCodeProps) {
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
      className="fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)] z-40"
    >
      <DaumPostCode
        onComplete={(data: DaumAddress) => {
          handleAddress(data.zonecode, data.roadAddress);
          setPostCodeModal(false);
        }}
        style={postCodeStyle}
      />
    </div>
  );
}
