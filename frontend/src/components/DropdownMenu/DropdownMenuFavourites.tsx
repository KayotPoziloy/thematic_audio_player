import React, { useState } from "react";
import Dropdown from "./Dropdown";

interface DropdownMenuFavouritesProps {
  name: string;
}

function DropdownMenuFavourites({ name }: DropdownMenuFavouritesProps) {
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
        { label: "Музыка", submenu: ["Gta 5", "Nfs"] },
        { label: "Станции", submenu: ["Тарантино", "Гай Ричи"] },
      ]}
    />
  );
}

export default DropdownMenuFavourites;