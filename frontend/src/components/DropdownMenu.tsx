import React, { useState } from "react";
import "./Dropdown.css"

export function DropdownMenu() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("open")
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closed")
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const handleOpen1 = () => {
    console.log("open")
    setOpen(true);
  };

  const handleClose1 = () => {
    console.log("closed")
    setOpen(false);
  };

  const handleMenuOne = () => {
    console.log("1")
  };

  const handleMenuTwo = () => {
    console.log("2")
  };

  const handleMenuThree = () => {
    console.log("3")
  };

  return (
    <Dropdown
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      trigger={
        <div>
          Dropdown
        </div>
      }
      menu={[
        <div onClick={handleMenuOne}>Игры</div>,
        <div onClick={handleMenuTwo}>Сериалы</div>,
        <div onClick={handleMenuThree}>Фильмы</div>,
      ]}
    />
  );
}

interface DropdownProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

const Dropdown:React.FC<DropdownProps> = ({ open, handleOpen, handleClose, trigger, menu }) => {
  return (
    <div
      className="dropdown"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {trigger}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};