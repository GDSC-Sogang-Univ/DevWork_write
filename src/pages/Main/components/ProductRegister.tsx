import React from "react";

const ProductRegisterButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      className="fixed bottom-4 right-4 z-50 bg-sogang-700 hover:bg-sogang-800 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      onClick={onClick}
      aria-label="상품 등록하기"
    >
      <span className="text-xl font-bold">+</span>
    </button>
  );
};

export default ProductRegisterButton;
