// import ButtonAction from "../../Components/ButtonAction";

import Link from "next/link";
const DashboardPortfolio = () => {
  return (
    <main>
      <section className="content">
        <div className="container-fluid">
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
                        <th>Category</th>
                        <th>Photo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Internet Explorer 4.0</td>
                        <td>Win 95+</td>
                        <td> 4</td>
                        <td>
                          <div className="d-flex gap-1">
                            <div className="d-flex gap-1">
                              <Link
                                href={"/dashboard/portfolio/show"}
                                legacyBehavior
                              >
                                <button className="btn btn-success" href="">
                                  Show
                                </button>
                              </Link>
                              <Link
                                href={"/dashboard/portfolio/edit"}
                                legacyBehavior
                              >
                                <button className="btn btn-primary" href="">
                                  Edit
                                </button>
                              </Link>
                              <Link
                                href={"/dashboard/portfolio/delete"}
                                legacyBehavior
                              >
                                <button className="btn btn-danger" href="">
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>1.</td>
                        <td>Internet Explorer 4.0</td>
                        <td>Win 95+</td>
                        <td> 4</td>
                        <td>
                          <div className="d-flex gap-1">
                            {/* <ButtonAction></ButtonAction> */}
                          </div>
                        </td>
                      </tr>
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
