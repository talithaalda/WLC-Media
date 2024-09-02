import { useEffect, useState } from "react";

const useTalentFilter = (talents) => {
  const [filters, setFilters] = useState([
    {
      attribute: "Name",
      method: "Contains",
      value: "",
      category: "All",
      minPriceIG: "",
      maxPriceIG: "",
      minPriceTikTok: "",
      maxPriceTikTok: "",
      relation: "",
    },
  ]);

  const filterTalents = (talents) => {
    return talents.filter((talent) => {
      let overallResult = true;

      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        const filterValueLower = filter.value.toLowerCase();
        let match = false;

        switch (filter.attribute) {
          case "Name":
            match = applyTextFilter(
              talent.name.toLowerCase(),
              filterValueLower,
              filter.method
            );
            break;
          case "Category":
            match =
              filter.category === "All" ||
              talent.category.toLowerCase() === filter.category.toLowerCase();
            break;
          case "Username IG":
            match = applyTextFilter(
              talent.userIG.toLowerCase(),
              filterValueLower,
              filter.method
            );
            break;
          case "Username TikTok":
            match = applyTextFilter(
              talent.userTikTok.toLowerCase(),
              filterValueLower,
              filter.method
            );
            break;
          case "Start from IG":
            match = applyPriceFilter(
              talent.startfromIG,
              filter.minPriceIG,
              filter.maxPriceIG
            );
            break;
          case "Start from TikTok":
            match = applyPriceFilter(
              talent.startfromTikTok,
              filter.minPriceTikTok,
              filter.maxPriceTikTok
            );
            break;
          default:
            match = true;
            break;
        }

        if (i === 0) {
          overallResult = match;
        } else {
          if (filters[i].relation === "And") {
            overallResult = overallResult && match;
          } else if (filters[i].relation === "Or") {
            overallResult = overallResult || match;
          }
        }

        if (filters[i].relation === "And" && !overallResult) {
          return false;
        }
      }

      return overallResult;
    });
  };

  const applyTextFilter = (fieldValue, filterValue, method) => {
    switch (method) {
      case "Is":
        return fieldValue === filterValue;
      case "Is not":
        return fieldValue !== filterValue;
      case "Contains":
        return fieldValue.includes(filterValue);
      case "Does not contain":
        return !fieldValue.includes(filterValue);
      case "Starts with":
        return fieldValue.startsWith(filterValue);
      case "Ends with":
        return fieldValue.endsWith(filterValue);
      default:
        return true;
    }
  };

  const applyPriceFilter = (price, minPrice, maxPrice) => {
    const min = parseFloat(minPrice.replace(/[^0-9.,]/g, "").replace(",", "."));
    const max = parseFloat(maxPrice.replace(/[^0-9.,]/g, "").replace(",", "."));

    if (isNaN(min) && isNaN(max)) return true;
    if (isNaN(min)) return price <= max;
    if (isNaN(max)) return price >= min;
    return price >= min && price <= max;
  };

  const [filteredTalents, setFilteredTalents] = useState([]);

  useEffect(() => {
    setFilteredTalents(filterTalents(talents));
  }, [talents, filters]);

  const handleAddFilter = () => {
    setFilters([
      ...filters,
      {
        attribute: "Name",
        method: "Contains",
        value: "",
        category: "All",
        minPriceIG: "",
        maxPriceIG: "",
        minPriceTikTok: "",
        maxPriceTikTok: "",
        relation: "And", // Default relation for new filters
      },
    ]);
  };

  const handleRemoveFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  return {
    filters,
    setFilters,
    filteredTalents,
    handleAddFilter,
    handleRemoveFilter,
  };
};

export default useTalentFilter;
