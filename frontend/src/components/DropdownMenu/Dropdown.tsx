import React, {useState} from "react";

interface DropdownProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  trigger: React.ReactNode;
  menu: { label: string; submenu: string[] }[];
}

const Dropdown:React.FC<DropdownProps> =
  ({
     open,
     handleOpen,
     handleClose,
     trigger,
     menu
   }) => {
    return (
      <div
        className="dropdown"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        {trigger}
        {open && (
          <ul className="menu">
            {menu.map((item, index) => (
              <DropdownItem key={index} label={item.label} submenu={item.submenu} />
            ))}
          </ul>
        )}
      </div>
    );
  };

interface DropdownItemProps {
  label: string;
  submenu: string[];
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, submenu }) => {
  const [subOpen, setSubOpen] = useState(false);

  const handleSubOpen = () => setSubOpen(true);
  const handleSubClose = () => setSubOpen(false);

  return (
    <li
      className="menu-item"
      onMouseEnter={handleSubOpen}
      onMouseLeave={handleSubClose}
    >
      <button>{label}</button>
      {subOpen && (
        <ul className="submenu">
          {submenu.map((subItem, index) => (
            <li key={index} className="submenu-item">
              <button>{subItem}</button>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default Dropdown;