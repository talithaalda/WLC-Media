import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
function CreatePortfolio() {
  const [category, setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/category-portfolio");
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
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    categoryId: yup.string().required("Category is required"),
    // file: yup
    //   .mixed()
    //   .required("Photo is required")
    //   .test(
    //     "fileSize",
    //     "File size is too large",
    //     (value) => value && value.size <= 2000000
    //   ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("categoryId", values.categoryId);
      try {
        const response = await axios.post("/api/portfolio/create", {
          title: formData.get("title"),
          categoryId: Number(formData.get("categoryId")),
        });
        console.log("Data berhasil ditambahkan:", response.data);
      } catch (error) {
        console.error("Axios error:", error);
      }

      router.push("/dashboard/portfolio");
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const { Formik } = formik;
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          title: "",
          categoryId: "",
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <main>
            <Container className="container-form">
              <h4 className="pb-3">Create Portfolio</h4>
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
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select a category</option>
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

export default CreatePortfolio;
