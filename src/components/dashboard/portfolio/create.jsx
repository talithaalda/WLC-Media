import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import * as formik from "formik";
import { get } from "http";
import Link from "next/link";
import ButtonComponents from "@/components/ButtonComponents";

function CreatePortfolio() {
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const { Formik } = formik;
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/category-portfolio");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const data = await response.json();
  //       setCategory(data);
  //     } catch (error) {
  //       console.error("Error fetching portfolio data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      case "brand":
        setBrand(value);
        break;
      default:
        break;
    }
  };
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    // categoryId: yup.string().required("Category is required"),
    brand: yup.string().required("Brand is required"),
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
      // formData.append("categoryId", values.categoryId);
      formData.append("file", values.file);
      formData.append("brand", values.brand);

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
        // categoryId: Number(formData.get("categoryId")),
        path,
        filename,
        brand,
      });

      // console.log("Data berhasil ditambahkan:", responseCreate.data);
      router.push({
        pathname: "/dashboard/portfolio",
        query: { createSuccess: true },
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          title: title,
          // categoryId: categoryId,
          brand: brand,
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <main>
            <Container className="container-form">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Create Portfolio</h4>
                <Link href="/dashboard/portfolio">
                  <ButtonComponents textButton="Back"></ButtonComponents>
                </Link>
              </div>
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
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    required
                    value={values.brand}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.brand}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    required
                    name="categoryId"
                    onChange={(event) => {
                      handleError(event);
                    }}
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
                </Form.Group> */}

                <Form.Group md="6" className="mb-4" controlId="formFile">
                  <Form.Label>Photo</Form.Label>
                  <div className="mb-3">
                    <div className="preview">
                      {previewImage && (
                        <div className="d-flex flex-column">
                          <Card.Img
                            key={values.file} // You can use file name as the key
                            variant="top"
                            src={previewImage}
                            style={{ width: "200px" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <Form.Control
                    type="file"
                    required
                    name="file" // This should match the argument in upload.single("file")
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue("file", event.currentTarget.files[0]);

                      // Update the preview image
                      const fileReader = new FileReader();
                      fileReader.onloadend = () => {
                        setPreviewImage(fileReader.result);
                      };
                      if (event.currentTarget.files[0]) {
                        fileReader.readAsDataURL(event.currentTarget.files[0]);
                      }
                    }}
                    isInvalid={!!errors.file}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.file}
                  </Form.Control.Feedback>
                  {/* Display the preview image */}
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
