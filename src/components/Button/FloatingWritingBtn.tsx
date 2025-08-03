import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@seed-design/react";
import { useFlow } from "@stackflow/react/future";
import FloatingBtn from "./FloatingBtn";

function FloatingWritingBtn() {
  const { push } = useFlow();

  const handleRegister = () => {
    push("form", {});
  };

  return (
    <FloatingBtn aria_label="상품 등록" onClickFunc={handleRegister}>
      <Icon svg={<IconPlusLine />} />
    </FloatingBtn>
  );
}

export default FloatingWritingBtn;
