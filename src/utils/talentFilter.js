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
          relation: "And",
        },
      ],
      relation: "And",
      subGroups: [],
    },
  ]);
  const [filteredTalents, setFilteredTalents] = useState(talents);
  useEffect(() => {
    setFilteredTalents(filterTalents(talents));
  }, [filterGroups, talents]);
  const filterTalents = (talents) => {
    return talents.filter((talent) =>
      applyFiltersRecursively(talent, filterGroups)
    );
  };

  const applyFiltersRecursively = (item, groups) => {
    if (groups.length === 0) return true;

    return groups.every((group) => {
      const groupResult = applyGroupFilters(item, group);
      const subGroupResults = group.subGroups.map((subGroup) =>
        applyFiltersRecursively(item, [subGroup])
      );

      const allSubGroupResults =
        subGroupResults.length > 0
          ? group.relation === "And"
            ? subGroupResults.every((result) => result)
            : subGroupResults.some((result) => result)
          : true;

      return group.relation === "And"
        ? groupResult && allSubGroupResults
        : groupResult || allSubGroupResults;
    });
  };

  const applyGroupFilters = (item, group) => {
    let result = true;
    for (let i = 0; i < group.filters.length; i++) {
      const filter = group.filters[i];
      const filterValueLower = filter.value.toLowerCase();
      let match = false;

      switch (filter.attribute) {
        case "Name":
          match = applyTextFilter(
            item.name.toLowerCase(),
            filterValueLower,
            filter.method
          );
          break;
        case "Category":
          match =
            filter.category === "All" ||
            applyTextFilter(
              item.category.toLowerCase(),
              filter.category.toLowerCase(),
              filter.method
            );
          break;
        case "Username IG":
          match = applyTextFilter(
            item.userIG.toLowerCase(),
            filterValueLower,
            filter.method
          );
          break;
        case "Username TikTok":
          match = applyTextFilter(
            item.userTikTok.toLowerCase(),
            filterValueLower,
            filter.method
          );
          break;
        case "Start from IG":
          match = applyPriceFilter(
            item.startfromIG,
            filter.minPriceIG,
            filter.maxPriceIG
          );
          break;
        case "Start from TikTok":
          match = applyPriceFilter(
            item.startfromTikTok,
            filter.minPriceTikTok,
            filter.maxPriceTikTok
          );
          break;
        default:
          match = true;
          break;
      }

      if (i === 0) {
        result = match;
      } else {
        if (filter.relation === "And") {
          result = result && match;
        } else {
          result = result || match;
        }
      }
    }

    return result;
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

  const handleAddFilter = (groupIndex, parentGroupIndex) => {
    let currentGroup = filterGroups;
    parentGroupIndex.forEach((i) => {
      currentGroup = currentGroup[i].subGroups;
    });
    currentGroup[groupIndex].filters.push({
      attribute: "Name",
      method: "Contains",
      value: "",
      category: "All",
      minPriceIG: "",
      maxPriceIG: "",
      minPriceTikTok: "",
      maxPriceTikTok: "",
      relation: "And",
    });
    setFilterGroups([...filterGroups]);
  };

  const handleRemoveFilter = (groupIndex, filterIndex, parentGroupIndex) => {
    const updatedGroups = [...filterGroups];
    let currentGroup = updatedGroups;
    parentGroupIndex.forEach((i) => {
      currentGroup = currentGroup[i].subGroups;
    });

    currentGroup[groupIndex].filters.splice(filterIndex, 1);

    if (currentGroup[groupIndex].filters.length === 0) {
      currentGroup.splice(groupIndex, 1);
    }

    setFilterGroups(updatedGroups);
  };

  const handleAddGroup = (groupIndex, parentGroupIndex) => {
    const currentGroup = [...filterGroups];

    if (currentGroup.length === 0) {
      currentGroup.push({
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
            relation: "And",
          },
        ],
        relation: "And",
        subGroups: [],
      });
    } else {
      let targetGroup = currentGroup;
      parentGroupIndex.forEach((i) => {
        targetGroup = targetGroup[i].subGroups;
      });
      targetGroup[groupIndex].subGroups.push({
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
            relation: "And",
          },
        ],
        relation: "And",
        subGroups: [],
      });
    }

    setFilterGroups(currentGroup);
  };

  const handleRemoveGroup = (groupIndex, parentGroupIndex) => {
    const updatedGroups = [...filterGroups];

    let currentGroup = updatedGroups;
    parentGroupIndex.forEach((i) => {
      currentGroup = currentGroup[i].subGroups;
    });
    currentGroup.splice(groupIndex, 1);
    if (currentGroup.length === 0 && parentGroupIndex.length > 0) {
      let parentGroup = updatedGroups;
      parentGroupIndex.slice(0, -1).forEach((i) => {
        parentGroup = parentGroup[i].subGroups;
      });

      parentGroup[parentGroupIndex[parentGroupIndex.length - 1]].relation =
        "And";
    }
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
  };
};

export default useTalentFilter;
