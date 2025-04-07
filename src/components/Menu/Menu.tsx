import React from "react";

interface MenuProps {
  children: React.ReactNode;
  onClose: () => void;
}
const Menu: React.FC<MenuProps> = ({ children, onClose }) => {
  return (
    <div
      className="absolute border border-slate-300 bg-white rounded-md shadow-md overflow-hidden top-12 right-0 z-50 w-52"
      onClick={() => {
        onClose();
      }}
    >
      <ul className="">{children}</ul>
    </div>
  );
};

export default Menu;
