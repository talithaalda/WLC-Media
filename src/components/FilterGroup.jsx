import React from "react";
import FilterComponents from "./FilterComponents";
import DropdownAddFilter from "./DropdownAddFilter";
import DropdownComponent from "./DropdownComponent";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

const FilterGroup = ({
  group,
  groupIndex,
  handleAddFilter,
  handleRemoveFilter,
  handleRemoveGroup,
  handleAddGroup,
  attributes,
  methods,
  categories,
  relations,
  setFilterGroups,
  filterGroups,
  parentGroupIndex = [],
}) => {
  const first = {
    border: parentGroupIndex.length === 0 ? "none" : "1px solid #ddd",
    padding: parentGroupIndex.length === 0 ? "20px" : "10px",
  };
  return (
    <div className="filter-group w-100 gap-1 d-flex flex-column" style={first}>
      <div className="d-flex justify-content-end align-items-center">
        {parentGroupIndex.length > 0 && (
          <button
            className="bg-transparent text-danger px-0 pb-2 d-flex align-items-center gap-1 border-0"
            style={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() => handleRemoveGroup(groupIndex, parentGroupIndex)}
          >
            <IoIosRemoveCircleOutline size={18} className="text-danger" />{" "}
            <b>Remove</b>
          </button>
        )}
      </div>
      {group.filters.map((filter, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <FilterComponents
            attributes={attributes}
            selectedAttribute={filter.attribute}
            handleAttributeSelect={(attribute) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              const targetGroup = currentGroup[groupIndex];
              targetGroup.filters[index].attribute = attribute;
              setFilterGroups(updatedGroups);
            }}
            methods={methods}
            selectedMethod={filter.method}
            handleMethodSelect={(method) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].method = method;
              setFilterGroups(updatedGroups);
            }}
            filterValue={filter.value}
            setFilterValue={(value) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].value = value;
              setFilterGroups(updatedGroups);
            }}
            categories={categories}
            selectedCategory={filter.category}
            handleCategorySelect={(category) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].category = category;
              setFilterGroups(updatedGroups);
            }}
            setMinPriceIG={(value) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].minPriceIG = value;
              setFilterGroups(updatedGroups);
            }}
            setMaxPriceIG={(value) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].maxPriceIG = value;
              setFilterGroups(updatedGroups);
            }}
            setMinPriceTikTok={(value) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].minPriceTikTok = value;
              setFilterGroups(updatedGroups);
            }}
            setMaxPriceTikTok={(value) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].maxPriceTikTok = value;
              setFilterGroups(updatedGroups);
            }}
            minPriceIG={filter.minPriceIG}
            maxPriceIG={filter.maxPriceIG}
            minPriceTikTok={filter.minPriceTikTok}
            maxPriceTikTok={filter.maxPriceTikTok}
            relations={relations}
            selectedRelation={filter.relation}
            handleRelationSelect={(relation) => {
              const updatedGroups = [...filterGroups];
              let currentGroup = updatedGroups;
              parentGroupIndex.forEach((i) => {
                currentGroup = currentGroup[i].subGroups;
              });
              currentGroup[groupIndex].filters[index].relation = relation;
              setFilterGroups(updatedGroups);
            }}
            selectedGroupRelation={group.relation}
            index={index}
            parentGroupIndex={parentGroupIndex}
          />
          <button
            className="border-0 bg-transparent"
            onClick={() =>
              handleRemoveFilter(groupIndex, index, parentGroupIndex)
            }
          >
            <IoIosRemoveCircleOutline size={24} className="text-danger" />
          </button>
        </div>
      ))}

      {group.subGroups &&
        group.subGroups.map((subGroup, subIndex) => (
          <>
            <div className="d-flex gap-2">
              <div style={{ width: "120px" }}>
                <DropdownComponent
                  array={relations}
                  title={group.relation}
                  onSelect={(e) => {
                    const updatedGroups = [...filterGroups];
                    let currentGroup = updatedGroups;
                    parentGroupIndex.forEach((i) => {
                      currentGroup = currentGroup[i].subGroups;
                    });
                    currentGroup[groupIndex].relation = e;
                    setFilterGroups(updatedGroups);
                  }}
                />
              </div>

              <FilterGroup
                key={subIndex}
                group={subGroup}
                groupIndex={subIndex}
                handleAddFilter={handleAddFilter}
                handleRemoveFilter={handleRemoveFilter}
                handleRemoveGroup={handleRemoveGroup}
                handleAddGroup={handleAddGroup}
                attributes={attributes}
                methods={methods}
                categories={categories}
                relations={relations}
                setFilterGroups={setFilterGroups}
                filterGroups={filterGroups}
                parentGroupIndex={[...parentGroupIndex, groupIndex]}
              />
            </div>
          </>
        ))}
      {group.filters.length !== 0 && parentGroupIndex.length < 2 && (
        <DropdownAddFilter
          groupIndex={groupIndex}
          handleAddFilter={handleAddFilter}
          handleAddFilterGroup={handleAddGroup}
          parentGroupIndex={parentGroupIndex}
        />
      )}
      {parentGroupIndex.length > 1 && (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="dropdown-item gap-2 btn-add-filter rounded-4 d-flex justify-content-center align-items-center  py-1"
            style={{
              width: "150px",
            }}
            onClick={() => {
              handleAddFilter(groupIndex, parentGroupIndex);
            }}
          >
            <span>
              <CiCirclePlus size={24} />
            </span>
            Add Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterGroup;
