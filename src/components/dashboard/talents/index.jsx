import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import CustomAlert from "../../AlertComponents";
import { useEffect, useState } from "react";

const DashboardTalents = () => {
  const [talents, setTalents] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/talent");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setTalents(data);
      } catch (error) {
        console.error("Error fetching talents data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/talent/${id}`, {
        method: "DELETE",
      });
      setDeleteSuccess(true);
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      // Update the state to reflect the changes
      setTalents((prevTalent) => prevTalent.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting talent data:", error);
    }
  };
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
              onClose={() => setUpdateSuccess(false)}
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
                        <th>Photo</th>
                        <th>Category Talent</th>
                        <th>Username Instagram</th>
                        <th>Username Tiktok</th>
                        <th>Start From TikTok</th>
                        <th>Start From Instagram</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {talents?.map((talent, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{talent.name}</td>
                          <td></td>
                          <td>{talent.category.name}</td>
                          <td>{talent.userIG}</td>
                          <td>{talent.userTikTok}</td>
                          <td>{talent.startfromTikTok}</td>
                          <td>{talent.startfromIG}</td>
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
