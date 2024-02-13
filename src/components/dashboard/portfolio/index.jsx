// import ButtonAction from "../../Components/ButtonAction";
import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import { useRouter } from "next/router";
import { usePortfolio } from "@/utils/portfolioContext";

const DashboardPortfolio = () => {
  const router = useRouter();
  const {
    portfolio,
    fetchData,
    handleDelete,
    deleteSuccess,
    setDeleteSuccess,
    setCreateSuccess,
    createSuccess,
  } = usePortfolio();
  const sortedData = portfolio.sort(
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
        <Link href={"/dashboard/portfolio/create"} className="p-3">
          <ButtonComponents textButton="Add New" />
        </Link>
        {/* <Link href={"/dashboard/portfolio/addcategory"} className="p-3">
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
                    <b>List Portfolio</b>
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
                        <th>Title</th>
                        <th>SOW</th>
                        <th>Talent</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData?.map((portfolio, index) => (
                        <tr key={portfolio.id}>
                          <td>{index + 1}.</td>
                          <td>{portfolio.title}</td>
                          <td>{portfolio.sow}</td>
                          <td>{portfolio.talent}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <div className="d-flex gap-1">
                                <Link
                                  href={`/dashboard/portfolio/${portfolio.id}/show`}
                                  legacyBehavior
                                >
                                  <button className="btn btn-success" href="">
                                    Show
                                  </button>
                                </Link>
                                <Link
                                  href={`/dashboard/portfolio/${portfolio.id}/edit`}
                                  legacyBehavior
                                >
                                  <button className="btn btn-primary" href="">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(portfolio.id)}
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

export default DashboardPortfolio;
