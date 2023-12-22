import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import * as formik from "formik";
import { get } from "http";

function CreatePortfolio() {
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const { Formik } = formik;
  const [createSuccess, setCreateSuccess] = useState(false);

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
    file: yup
      .mixed()
      .required("Photo is required")
      .test(
        "fileFormat",
        "Invalid file format. Please upload a JPEG, PNG, or GIF file.",
        (value) => {
          // Jika tidak ada berkas, validasi dilewati
          if (!value) {
            return true;
          }

          // Tentukan tipe file yang diizinkan
          const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

          // Periksa tipe file berdasarkan "type" property pada berkas
          return allowedImageTypes.includes(value.type);
        }
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("categoryId", values.categoryId);
      formData.append("file", values.file);

      // Menggunakan API route upload yang telah Anda buat

      const responseUpload = await axios.post(
        "/api/portfolio/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Dapatkan path dan filename dari respons upload
      const { path, filename } = responseUpload.data;
      // Simpan informasi file ke dalam API route create
      const responseCreate = await axios.post("/api/portfolio/create", {
        title: formData.get("title"),
        categoryId: Number(formData.get("categoryId")),
        path,
        filename,
      });

      // console.log("Data berhasil ditambahkan:", responseCreate.data);
      router.push({
        pathname: "/dashboard/portfolio",
        query: { createSuccess: true },
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          title: "",
          categoryId: "",
          file: "",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <main>
            <Container className="container-form">
              <h4 className="pb-3">Create Portfolio</h4>
              <Form
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
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
                    isInvalid={!!errors.categoryId}
                  >
                    <option value="">Select a category</option>
                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.categoryId}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="6" className="mb-4" controlId="formFile">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="file" // This should match the argument in upload.single("file")
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
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
