import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomAlert from "../../AlertComponents";
function EditPortfolio() {
  const { Formik } = formik;
  const [category, setCategory] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const router = useRouter();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        if (!id) {
          return;
        }
        const rute = `/api/portfolio/${id}`;
        const response = await fetch(rute);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("/api/category-portfolio");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchDataById();
    fetchCategoryData();
  }, [id]);

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.put(`/api/portfolio/${id}`, {
        title: values.title,
        categoryId: Number(values.categoryId),
      });

      if (response.status === 200) {
        console.log("Data updated successfully");
        setUpdateSuccess(true);
        resetForm();
        const updatedDataResponse = await fetch(`/api/portfolio/${id}`);
        const updatedData = await updatedDataResponse.json();
        setPortfolio(updatedData);
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    categoryId: yup.number().required("Category is required"),
    // file: yup.mixed().required(),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleUpdate}
        initialValues={{
          title: portfolio.title || "",
          categoryId: portfolio.categoryId || "",
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <main>
            <Container className="container-form">
              <h4 className="pb-3">Edit Portfolio</h4>
              {updateSuccess && (
                <CustomAlert
                  variant="success"
                  message="Data updated successfully!"
                  onClose={() => setUpdateSuccess(false)}
                />
              )}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    required
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    required
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  >
                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="6" className="mb-4" controlId="formFile">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={handleChange}
                    isInvalid={!!errors.file}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.file}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button className="btn btn-wlc" type="submit">
                  Update Portfolio
                </Button>
              </Form>
            </Container>
          </main>
        )}
      </Formik>
    </>
  );
}

export default EditPortfolio;
