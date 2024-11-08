import React, { useState } from "react";
import "./Dropdown.css"
import Dropdown from "./Dropdown";

function DropdownMenu({ name }: { name: String }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Dropdown
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      trigger={
        <div>
          {name}
        </div>
      }
      menu={[
        { label: "Игры", submenu: ["Gta 5", "Nfs"] },
        { label: "Фильмы", submenu: ["Тарантино", "Гай Ричи"] },
        { label: "Сериалы", submenu: ["Сопрано", "Во все тяжкие"] },
      ]}
    />
  );
}

export default DropdownMenu;