import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropdownAddFilter = ({
  handleAddFilter,
  handleAddFilterGroup,
  groupIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <Dropdown
      onToggle={toggleDropdown}
      show={isOpen}
      className="position-relative d-flex  justify-content-center "
    >
      <div
        className="d-flex align-items-center gap-2 justify-content-center btn-add-filter"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        <div>
          <CiCirclePlus size={24} />
        </div>
        <div>Add Filter</div>
        {isOpen ? (
          <RiArrowDropUpLine color="black" size={30} />
        ) : (
          <RiArrowDropDownLine color="black" size={30} />
        )}
      </div>
      <Dropdown.Menu
        show={isOpen}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          top: "100%",
          marginTop: "5px",
        }}
      >
        <div className="mt-1 border-xs text-teracota w-100">
          <button
            className="dropdown-item"
            onClick={() => {
              handleAddFilter(groupIndex);
              toggleDropdown();
            }}
          >
            Add Filter Rule
          </button>
          <button
            className="dropdown-item"
            onClick={() => {
              handleAddFilterGroup();
              toggleDropdown();
            }}
          >
            Add Filter Group
          </button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownAddFilter;
