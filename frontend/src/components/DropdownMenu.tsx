import React, { useState } from "react";
import "./Dropdown.css"

export function DropdownMenu() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    console.log("1")
    setOpen(false);
  };

  const handleMenuTwo = () => {
    console.log("2")
    setOpen(false);
  };

  return (
    <Dropdown
      open={open}
      trigger={<button onClick={handleOpen}>Dropdown</button>}
      menu={[
        <button onClick={handleMenuOne}>Menu 1</button>,
        <button onClick={handleMenuTwo}>Menu 2</button>,
      ]}
    />
  );
}

interface DropdownProps {
  open: boolean;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

const Dropdown:React.FC<DropdownProps> = ({ open, trigger, menu }) => {
  return (
    <div className="dropdown">
      {trigger}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};