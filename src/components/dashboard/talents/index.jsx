// pages/dashboard/talents.js
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoFilter } from "react-icons/io5";
import ButtonComponents from "@/components/ButtonComponents";
import CustomAlert from "../../AlertComponents";
import formatToRupiah from "@/components/FormatToRp";
import { useTalent } from "@/utils/talentContext";
import useTalentFilter from "@/utils/talentFilter";
import { IoIosSearch } from "react-icons/io";
import FilterGroup from "@/components/FilterGroup";
import { CiCirclePlus } from "react-icons/ci";
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
  const [searchTerm, setSearchTerm] = useState("");
  const filterRef = useRef(null);
  const {
    filterGroups,
    setFilterGroups,
    filteredTalents,
    handleAddFilter,
    handleRemoveFilter,
    handleRemoveGroup,
    handleAddGroup,
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
    "Rapper",
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
      <section className="content min-vh-100">
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
                        style={{ paddingLeft: "35px" }}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    {!openFilter ? (
                      <>
                        <IoFilter
                          className="justify-content-center"
                          size={26}
                          onClick={handleOpenFilter}
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    ) : (
                      <div
                        ref={filterRef}
                        className="d-flex flex-column floating-filter"
                      >
                        {filterGroups.map((group, groupIndex) => (
                          <FilterGroup
                            key={groupIndex}
                            group={group}
                            groupIndex={groupIndex}
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
                          />
                        ))}
                        {!filterGroups[0] && (
                          <button
                            className="dropdown-item gap-2 d-flex align-items-center py-3 px-4"
                            onClick={() => {
                              handleAddGroup(0, []);
                            }}
                          >
                            <span>
                              <CiCirclePlus size={24} />
                            </span>
                            Add Filter
                          </button>
                        )}
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
                            <tr key={talent.id}>
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
                                    <button className="btn btn-success">
                                      Show
                                    </button>
                                  </Link>
                                  <Link
                                    href={`/dashboard/talents/${talent.id}/edit`}
                                    legacyBehavior
                                  >
                                    <button className="btn btn-primary">
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
                          <tr>
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
