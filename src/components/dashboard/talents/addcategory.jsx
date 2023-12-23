import * as formik from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Router, useRouter } from "next/router";
import axios from "axios";
import CustomAlert from "@/components/AlertComponents";

const AddcategoryComponent = () => {
  const [category, setCategory] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required("Category name is required"),
  });
  const router = useRouter();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      try {
        const response = await axios.post("/api/category-talent/create", {
          name: formData.get("name"),
        });
        setCategory([...category, response.data]);
        setUpdateSuccess(true);
      } catch (error) {
        console.error("Axios error:", error);
      }
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/category-talent");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/category-talent/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setDeleteError(true);
        throw new Error("Failed to delete data");
      } else {
        setDeleteSuccess(true);
      }

      // Update the state to reflect the changes
      setCategory((prevCat) => prevCat.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting portfolio data:", error);
    }
  };
  return (
    <main>
      <div className="row">
        <div className="col-lg-8">
          <div className="row ps-2 pb-3">
            <div className="col-12">
              {updateSuccess && (
                <CustomAlert
                  variant="success"
                  message="Data created successfully!"
                  onClose={() => setUpdateSuccess(false)}
                />
              )}
              {deleteSuccess && (
                <CustomAlert
                  variant="danger"
                  message="Data delete successfully!"
                  onClose={() => setDeleteSuccess(false)}
                />
              )}
              {deleteError && (
                <CustomAlert
                  variant="danger"
                  message="Cannot delete category, category has been used!"
                  onClose={() => setDeleteError(false)}
                />
              )}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <b>List Category Talent</b>
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
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category?.map((category, index) => (
                        <tr key={category.id}>
                          <td>{index + 1}.</td>
                          <td>{category.name}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(category.id)}
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
        <div className="col">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Container className="container-form">
                {/* <h5 className="py-3">Create Category Portfolio</h5> */}
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="validationCustom01">
                    <Form.Label>New Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      name="name"
                      required
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button className="btn btn-wlc" type="submit">
                    Create Category
                  </Button>
                </Form>
              </Container>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default AddcategoryComponent;
