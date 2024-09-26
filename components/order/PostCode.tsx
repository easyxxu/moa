import { CSSProperties } from "react";
import DaumPostCode from "react-daum-postcode";

interface Address {
  postCode: string;
  defaultAddress: string;
  detailAddress: string;
}

interface PostCodeProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  setPostCodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostCode({
  address,
  setAddress,
  setPostCodeModal,
}: PostCodeProps) {
  const handleComplete = (data: any) => {
    setAddress({
      ...address,
      postCode: data.zonecode,
      defaultAddress: data.roadAddress,
    });
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
