import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropdownComponent = ({ array = [], title, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <Dropdown show={isOpen} onToggle={handleToggle} className="w-100">
      <Dropdown.Toggle
        className="btn btn-filter justify-content-center d-flex align-items-center custom-dropdown-toggle py-1 w-100"
        id="dropdown-basic"
      >
        {title}
        {isOpen ? (
          <RiArrowDropUpLine color="#c64b38" size={30} />
        ) : (
          <RiArrowDropDownLine color="#c64b38" size={30} />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu
        show={isOpen}
        className="mt-1 border-xs text-teracota w-100"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          left: "50%",
          transform: "translateX(-50%)", // Posisikan di tengah secara horizontal
        }}
      >
        {Array.isArray(array) &&
          array.map((item, index) => (
            <Dropdown.Item
              key={index}
              as="button"
              onClick={() => handleSelect(item)}
            >
              {item}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
