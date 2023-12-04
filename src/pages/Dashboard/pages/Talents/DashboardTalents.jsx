import { Link } from "react-router-dom";

const DashboardTalents = () => {
  return (
    <main>
      <section className="content">
        <div className="container-fluid">
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
                        <th>Photo</th>
                        <th>Category Talent</th>
                        <th>Username Instagram</th>
                        <th>Username Tiktok</th>
                        <th>Start From</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Trident</td>
                        <td>Trident</td>
                        <td>Internet Explorer 4.0</td>
                        <td>Win 95+</td>
                        <td> 4</td>
                        <td>X</td>
                        <td>
                          <div className="d-flex gap-1">
                            <div className="d-flex gap-1">
                              <Link to={"/dashboard/talents/show"}>
                                <button className="btn btn-success" href="">
                                  Show
                                </button>
                              </Link>
                              <Link to={"/dashboard/talents/edit"}>
                                <button className="btn btn-primary" href="">
                                  Edit
                                </button>
                              </Link>
                              <Link to={"/dashboard/talents/delete"}>
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
                        <td>Trident</td>
                        <td>Trident</td>
                        <td>Internet Explorer 5.0</td>
                        <td>Win 95+</td>
                        <td>5</td>
                        <td>C</td>
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
export default DashboardTalents;
