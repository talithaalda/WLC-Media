import React, { useEffect, useState } from "react";
import DropdownComponent from "./DropdownComponent";
import formatToRupiah from "./FormatToRp";

const FilterComponents = ({
  attributes,
  selectedAttribute,
  handleAttributeSelect,
  methods,
  selectedMethod,
  handleMethodSelect,
  categories,
  selectedCategory,
  handleCategorySelect,
  filterValue,
  setFilterValue,
  setMinPriceIG,
  setMaxPriceIG,
  setMinPriceTikTok,
  setMaxPriceTikTok,
  minPriceIG,
  maxPriceIG,
  minPriceTikTok,
  maxPriceTikTok,
  relations,
  selectedRelation,
  handleRelationSelect,
  index,
}) => {
  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    const numericValue = value.replace(/[^0-9]/g, "");

    if (name === "startFromMinTikTok") {
      setMinPriceTikTok(numericValue);
    } else if (name === "startFromMaxTikTok") {
      setMaxPriceTikTok(numericValue);
    } else if (name === "startFromMaxIG") {
      setMaxPriceIG(numericValue);
    } else if (name === "startFromMinIG") {
      setMinPriceIG(numericValue);
    }
  };
  const formatPrice = (price) => {
    const numericValue = parseInt(price, 10);
    if (!isNaN(numericValue)) {
      return formatToRupiah(numericValue);
    }
    return "";
  };

  const renderFilterOptions = () => {
    if (
      ["Name", "Username IG", "Username TikTok"].includes(selectedAttribute)
    ) {
      return (
        <div className="d-flex gap-2 w-100">
          <DropdownComponent
            array={methods}
            title={selectedMethod}
            onSelect={handleMethodSelect}
          />
          <input
            type="text"
            name={selectedAttribute.toLowerCase().replace(" ", "")}
            className="form-control"
            placeholder="Enter filter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      );
    }

    if (selectedAttribute === "Category") {
      return (
        <div className="d-flex gap-2 w-100">
          <DropdownComponent
            array={methods}
            title={selectedMethod}
            onSelect={handleMethodSelect}
          />
          <DropdownComponent
            array={categories}
            title={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      );
    }

    if (selectedAttribute === "Start from IG") {
      return (
        <div className="d-flex gap-2 align-items-center w-100">
          <input
            type="text"
            name="startFromMinIG"
            className="form-control"
            placeholder="Min price"
            value={formatPrice(minPriceIG)}
            onChange={handlePriceChange}
          />
          <h6>-</h6>
          <input
            type="text"
            name="startFromMaxIG"
            className="form-control"
            placeholder="Max price"
            value={formatPrice(maxPriceIG)}
            onChange={handlePriceChange}
          />
        </div>
      );
    }
    if (selectedAttribute === "Start from TikTok") {
      return (
        <div className="d-flex gap-2 align-items-center w-100">
          <input
            type="text"
            name="startFromMinTikTok"
            className="form-control"
            placeholder="Min price"
            value={formatPrice(minPriceTikTok)}
            onChange={handlePriceChange}
          />
          <h6>-</h6>
          <input
            type="text"
            name="startFromMaxTikTok"
            className="form-control"
            placeholder="Max price"
            value={formatPrice(maxPriceTikTok)}
            onChange={handlePriceChange}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="d-flex  align-items-center justify-content-between w-100">
      <div className="d-flex align-items-center justify-content-center">
        {index == 0 && (
          <div
            className="d-flex justify-content-center "
            style={{
              width: "82px",
            }}
          >
            Filter
          </div>
        )}
        {index > 0 && (
          <div
            className="d-flex justify-content-center "
            style={{ width: "82px" }}
          >
            <DropdownComponent
              array={relations}
              title={selectedRelation}
              onSelect={handleRelationSelect}
            />
          </div>
        )}
      </div>

      <div className="d-flex gap-2 align-items-center w-100">
        <div className="ms-2">
          <DropdownComponent
            array={attributes}
            title={selectedAttribute}
            onSelect={handleAttributeSelect}
          />
        </div>
        {renderFilterOptions()}
      </div>
    </div>
  );
};

export default FilterComponents;
