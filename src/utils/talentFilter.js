import { useEffect, useState } from "react";

const useTalentFilter = (talents) => {
  const [filterGroups, setFilterGroups] = useState([
    {
      filters: [
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
      ],
      relation: "",
    },
  ]);

  const filterTalents = (talents) => {
    return talents.filter((talent) => {
      let overallResult = true;
      if (filterGroups.length > 0) {
        const firstGroup = filterGroups[0];
        let firstGroupResult = true;

        for (let i = 0; i < firstGroup.filters.length; i++) {
          const filter = firstGroup.filters[i];
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
            firstGroupResult = match;
          } else {
            if (firstGroup.filters[i].relation === "And") {
              firstGroupResult = firstGroupResult && match;
            } else if (firstGroup.filters[i].relation === "Or") {
              firstGroupResult = firstGroupResult || match;
            }
          }

          if (firstGroup.filters[i].relation === "And" && !firstGroupResult) {
            break;
          }
        }

        overallResult = firstGroupResult;
      }

      for (let g = 1; g < filterGroups.length; g++) {
        const group = filterGroups[g];
        let groupResult = group.relation === "And";

        for (let i = 0; i < group.filters.length; i++) {
          const filter = group.filters[i];
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
            groupResult = match;
          } else {
            if (group.filters[i].relation === "And") {
              groupResult = groupResult && match;
            } else if (group.filters[i].relation === "Or") {
              groupResult = groupResult || match;
            }
          }

          if (group.filters[i].relation === "And" && !groupResult) {
            break;
          }
        }
        if (group.relation === "And") {
          overallResult = overallResult && groupResult;
        } else if (group.relation === "Or") {
          overallResult = overallResult || groupResult;
        }

        if (group.relation === "And" && !overallResult) {
          break;
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
  }, [talents, filterGroups]);

  const handleAddFilter = (groupIndex) => {
    const updatedGroups = [...filterGroups];
    if (updatedGroups[groupIndex]) {
      updatedGroups[groupIndex].filters.push({
        attribute: "Name",
        method: "Contains",
        value: "",
        category: "All",
        minPriceIG: "",
        maxPriceIG: "",
        minPriceTikTok: "",
        maxPriceTikTok: "",
        relation: "Or",
      });
      setFilterGroups(updatedGroups);
    }
  };

  const handleRemoveFilter = (groupIndex, filterIndex) => {
    const updatedGroups = [...filterGroups];
    updatedGroups[groupIndex].filters.splice(filterIndex, 1);
    if (updatedGroups[groupIndex].filters.length === 0) {
      updatedGroups.splice(groupIndex, 1);
    }
    setFilterGroups(updatedGroups);
  };
  const handleAddGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        relation: "Or",
        filters: [
          {
            attribute: "Name",
            method: "Contains",
            value: "",
            category: "All",
            minPriceIG: "",
            maxPriceIG: "",
            minPriceTikTok: "",
            maxPriceTikTok: "",
            relation: "Or",
          },
        ],
      },
    ]);
  };

  const handleRemoveGroup = (index) => {
    setFilterGroups(filterGroups.filter((_, i) => i !== index));
  };
  const handleGroupRelationChange = (groupIndex, relation) => {
    const updatedGroups = [...filterGroups];
    updatedGroups[groupIndex].relation = relation;
    setFilterGroups(updatedGroups);
  };
  return {
    filterGroups,
    setFilterGroups,
    filteredTalents,
    handleAddFilter,
    handleRemoveFilter,
    handleAddGroup,
    handleRemoveGroup,
    handleGroupRelationChange,
  };
};

export default useTalentFilter;
