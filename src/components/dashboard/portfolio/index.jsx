// import ButtonAction from "../../Components/ButtonAction";
import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import { useRouter } from "next/router";

const DashboardPortfolio = () => {
  const [porto, setPorto] = useState([]);
  let [deleteSuccess, setDeleteSuccess] = useState(false);
  let [createSuccess, setCreateSuccess] = useState(false);
  const router = useRouter();

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
    const fetchData = async () => {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPorto(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const deleteImageResponse = await fetch(
        `/api/portfolio/image/edit/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!deleteImageResponse.ok) {
        throw new Error("Failed to delete image");
      }
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      } else {
        setDeleteSuccess(true);
      }

      // Update the state to reflect the changes
      setPorto((prevPorto) => prevPorto.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  return (
    <main>
      <section className="content">
        <Link href={"/dashboard/portfolio/create"} className="p-3">
          <ButtonComponents textButton="Add New" />
        </Link>
        <Link href={"/dashboard/portfolio/addcategory"} className="p-3">
          <button className="btn btn-success"> + Add New Category</button>
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
                      {porto?.map((porto, index) => (
                        <tr key={porto.id}>
                          <td>{index + 1}.</td>
                          <td>{porto.title}</td>
                          <td>{porto.category.name}</td>
                          <td> 4</td>
                          <td>
                            <div className="d-flex gap-1">
                              <div className="d-flex gap-1">
                                <Link
                                  href={`/dashboard/portfolio/${porto.id}/show`}
                                  legacyBehavior
                                >
                                  <button className="btn btn-success" href="">
                                    Show
                                  </button>
                                </Link>
                                <Link
                                  href={`/dashboard/portfolio/${porto.id}/edit`}
                                  legacyBehavior
                                >
                                  <button className="btn btn-primary" href="">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(porto.id)}
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
