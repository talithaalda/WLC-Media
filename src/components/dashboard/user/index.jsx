// import ButtonAction from "../../Components/ButtonAction";
import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import { useRouter } from "next/router";
import { useUser } from "@/utils/userContext";

const DashboardUser = () => {
  const {
    user,
    deleteSuccess,
    createSuccess,
    setCreateSuccess,
    setDeleteSuccess,
    handleDelete,
    fetchData,
  } = useUser();
  const router = useRouter();
  const sortedData = user.sort(
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
        <Link href={"/dashboard/user/create"} className="p-3">
          <ButtonComponents textButton="Add New" />
        </Link>
        <div className="container-fluid mt-3">
          {deleteSuccess && (
            <CustomAlert
              variant="danger"
              message="User deleted successfully!"
              onClose={() => setDeleteSuccess(false)}
            />
          )}
          {createSuccess && (
            <CustomAlert
              variant="success"
              message="User created successfully!"
              onClose={() => setCreateSuccess(false)}
            />
          )}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <b>List user</b>
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
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData?.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}.</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <div className="d-flex gap-1">
                                <Link
                                  href={`/dashboard/user/${user.id}/edit`}
                                  legacyBehavior
                                >
                                  <button className="btn btn-primary" href="">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(user.id)}
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

export default DashboardUser;
