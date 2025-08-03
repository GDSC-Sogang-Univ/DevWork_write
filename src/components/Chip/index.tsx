import { ActionButton } from "seed-design/ui/action-button";

interface Props {
  label: string;
  isSelected?: boolean;
  onClickFunc: () => void;
}

function Chip({ label, isSelected, onClickFunc }: Props) {
  return (
    <ActionButton
      onClick={onClickFunc}
      size="xsmall"
      variant={isSelected ? "brandSolid" : "neutralWeak"}
      className={`!h-9 !font-normal ${isSelected ? "" : "text-gray-800"}`}
    >
      {label}
    </ActionButton>
  );
}

export default Chip;
