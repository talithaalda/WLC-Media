import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import CustomAlert from "../../AlertComponents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import formatToRupiah from "@/components/FormatToRp";
import { useTalent } from "@/utils/talentContext";

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
  const sortedData = talents.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
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
  }, []);

  return (
    <main>
      <section className="content">
        <Link href={"/dashboard/talents/create"} className="p-3">
          <ButtonComponents textButton="Add New" />
        </Link>
        {/* <Link href={"/dashboard/talents/addcategory"} className="p-3">
          <button className="btn btn-success"> + Add New Category</button>
        </Link> */}
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
                <div className="card-header">
                  <h5 className="card-title">
                    <b>List Talents</b>
                  </h5>
                </div>

                <div className="card-body table-responsive">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Category Talent</th>
                        <th>Username Instagram</th>
                        <th>Username Tiktok</th>
                        <th>Start From Instagram</th>
                        <th>Start From TikTok</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData?.map((talent, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{talent.name}</td>
                          <td>{talent.category.name}</td>
                          <td>{talent.userIG}</td>
                          <td>{talent.userTikTok}</td>
                          <td> {formatToRupiah(talent.startfromIG)}</td>
                          <td> {formatToRupiah(talent.startfromTikTok)}</td>
                          <td>
                            <div className="d-flex gap-1">
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
