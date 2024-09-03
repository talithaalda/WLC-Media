// pages/dashboard/talents.js

import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import CustomAlert from "../../AlertComponents";
import { useRouter } from "next/router";
import formatToRupiah from "@/components/FormatToRp";
import { useTalent } from "@/utils/talentContext";
import FilterComponents from "@/components/FilterComponents";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import useTalentFilter from "@/utils/talentFilter"; // Import custom hook
import { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import DropdownAddFilter from "@/components/DropdownAddFilter";

const DashboardTalents = () => {
  const {
    talents,
    deleteSuccess,
    setDeleteSuccess,
    createSuccess,
    setCreateSuccess,
    fetchData,
    handleDelete,
  } = useTalent();
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const filterRef = useRef(null);
  const {
    filters,
    setFilters,
    filteredTalents,
    handleAddFilter,
    handleRemoveFilter,
  } = useTalentFilter(talents);

  const attributes = [
    "Name",
    "Category",
    "Username IG",
    "Username TikTok",
    "Start from IG",
    "Start from TikTok",
  ];

  const methods = [
    "Is",
    "Is not",
    "Contains",
    "Does not contain",
    "Starts with",
    "Ends with",
  ];

  const categories = [
    "All",
    "K-pop Idol",
    "Singer",
    "Actor",
    "Influencer",
    "Model",
  ];

  const relations = ["And", "Or"];

  useEffect(() => {
    setDeleteSuccess(router.query.deleteSuccess === "true");
    setCreateSuccess(router.query.createSuccess === "true");
    if (
      router.query.createSuccess === "true" ||
      router.query.deleteSuccess === "true"
    ) {
      const { pathname, query } = router;
      const newQuery = { ...query };
      delete newQuery.createSuccess;
      delete newQuery.deleteSuccess;
      router.replace({ pathname, query: newQuery });
    }
    fetchData();
  }, [router, fetchData, setDeleteSuccess, setCreateSuccess]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const filteredTalentsWithSearch = filteredTalents
    .filter((talent) => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      return (
        talent.name.toLowerCase().includes(lowercasedSearchTerm) ||
        talent.category.toLowerCase().includes(lowercasedSearchTerm) ||
        talent.userIG.toLowerCase().includes(lowercasedSearchTerm) ||
        talent.userTikTok.toLowerCase().includes(lowercasedSearchTerm) ||
        (talent.startfromIG &&
          formatToRupiah(talent.startfromIG)
            .toLowerCase()
            .includes(lowercasedSearchTerm)) ||
        (talent.startfromTikTok &&
          formatToRupiah(talent.startfromTikTok)
            .toLowerCase()
            .includes(lowercasedSearchTerm))
      );
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <main>
      <section className="content">
        <Link href={"/dashboard/talents/create"} className="p-3">
          <ButtonComponents textButton="Add New" />
        </Link>
        <div className="container-fluid mt-3">
          {deleteSuccess && (
            <CustomAlert
              variant="danger"
              message="Data deleted successfully!"
              onClose={() => setDeleteSuccess(false)}
            />
          )}
          {createSuccess && (
            <CustomAlert
              variant="success"
              message="Data created successfully!"
              onClose={() => setCreateSuccess(false)}
            />
          )}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title">
                    <b>List Talents</b>
                  </h5>
                  <div className="d-flex gap-2 align-items-center">
                    <div
                      className="d-flex align-items-center position-relative"
                      style={{ width: "250px" }}
                    >
                      <IoIosSearch
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        style={{ paddingLeft: "35px" }} // Beri padding kiri tambahan untuk memberi ruang pada ikon
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    {!openFilter ? (
                      <IoFilter
                        className="justify-content-center"
                        size={26}
                        onClick={handleOpenFilter}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <div
                        ref={filterRef}
                        className="d-flex flex-column floating-filter p-4"
                      >
                        {filters.map((filter, index) => (
                          <div key={index} className="mb-2 d-flex gap-2 ">
                            <FilterComponents
                              attributes={attributes}
                              selectedAttribute={filter.attribute}
                              handleAttributeSelect={(attribute) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].attribute = attribute;
                                setFilters(updatedFilters);
                              }}
                              methods={methods}
                              selectedMethod={filter.method}
                              handleMethodSelect={(method) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].method = method;
                                setFilters(updatedFilters);
                              }}
                              filterValue={filter.value}
                              setFilterValue={(value) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].value = value;
                                setFilters(updatedFilters);
                              }}
                              categories={categories}
                              selectedCategory={filter.category}
                              handleCategorySelect={(category) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].category = category;
                                setFilters(updatedFilters);
                              }}
                              setMinPriceIG={(value) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].minPriceIG = value;
                                setFilters(updatedFilters);
                              }}
                              setMaxPriceIG={(value) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].maxPriceIG = value;
                                setFilters(updatedFilters);
                              }}
                              setMinPriceTikTok={(value) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].minPriceTikTok = value;
                                setFilters(updatedFilters);
                              }}
                              setMaxPriceTikTok={(value) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].maxPriceTikTok = value;
                                setFilters(updatedFilters);
                              }}
                              minPriceIG={filter.minPriceIG}
                              maxPriceIG={filter.maxPriceIG}
                              minPriceTikTok={filter.minPriceTikTok}
                              maxPriceTikTok={filter.maxPriceTikTok}
                              relations={relations}
                              selectedRelation={filter.relation}
                              handleRelationSelect={(relation) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].relation = relation;
                                setFilters(updatedFilters);
                              }}
                              index={index}
                            />
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => handleRemoveFilter(index)}
                            >
                              <IoMdRemoveCircleOutline
                                size={24}
                                className="text-danger"
                              />
                            </button>
                          </div>
                        ))}
                        <DropdownAddFilter
                          handleAddFilter={handleAddFilter}
                          // handleAddFilterGroup={handleAddFilterGroup}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Category</th>
                          <th scope="col">IG Username</th>
                          <th scope="col">TikTok Username</th>
                          <th scope="col">IG Start from</th>
                          <th scope="col">TikTok Start from</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTalentsWithSearch.length > 0 ? (
                          filteredTalentsWithSearch.map((talent, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{talent.name}</td>
                              <td>{talent.category}</td>
                              <td>{talent.userIG}</td>
                              <td>{talent.userTikTok}</td>
                              <td>{formatToRupiah(talent.startfromIG)}</td>
                              <td>{formatToRupiah(talent.startfromTikTok)}</td>
                              <td>
                                <div className="d-flex gap-1">
                                  <Link
                                    href={`/dashboard/talents/${talent.id}/show`}
                                    legacyBehavior
                                  >
                                    <button className="btn btn-success" href="">
                                      Show
                                    </button>
                                  </Link>
                                  <Link
                                    href={`/dashboard/talents/${talent.id}/edit`}
                                    legacyBehavior
                                  >
                                    <button className="btn btn-primary" href="">
                                      Edit
                                    </button>
                                  </Link>

                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(talent.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr c>
                            <td colSpan="8" className="text-center">
                              No talents found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardTalents;
