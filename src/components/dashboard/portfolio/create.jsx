import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { useState } from "react";
import * as formik from "formik";
import Link from "next/link";
import ButtonComponents from "@/components/ButtonComponents";
import { usePortfolio } from "@/utils/portfolioContext";

function CreatePortfolio() {
  // const [category, setCategory] = useState([]);
  const { Formik } = formik;
  const [title, setTitle] = useState("");
  // const [categoryId, setCategoryId] = useState("");
  const [sow, setSow] = useState("");
  const [talent, setTalent] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [filename, setFileName] = useState(null);
  const { handleSubmit, isImage } = usePortfolio();
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
      case "sow":
        setSow(value);
        break;
      case "talent":
        setTalent(value);
        break;
      default:
        break;
    }
  };
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    // categoryId: yup.string().required("Category is required"),
    sow: yup.string().required("SOW is required"),
    talent: yup.string().required("Talent is required"),
    file: yup
      .mixed()
      .required("Photo/Video is required")
      .test(
        "fileFormat",
        "Invalid file format. Please upload a JPEG, PNG, or GIF file.",
        (value) => {
          // Jika tidak ada berkas, validasi dilewati
          if (!value) {
            return true;
          }

          // Tentukan tipe file yang diizinkan
          const allowedImageTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "video/mp4",
            "video/quicktime",
          ];

          // Periksa tipe file berdasarkan "type" property pada berkas
          return allowedImageTypes.includes(value.type);
        }
      )
      .test("fileSize", "File size must be less than 10MB", (value) => {
        // Jika tidak ada berkas, validasi dilewati
        if (!value) {
          return true;
        }
        // Periksa ukuran berkas (dalam bytes)
        return value.size <= 10 * 1024 * 1024; // 10MB
      }),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          title: title,
          // categoryId: categoryId,
          sow: sow,
          talent: talent,
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
                  <Form.Label>SOW</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="SOW"
                    name="sow"
                    required
                    value={values.sow}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.sow}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.sow}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Talent</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Talent"
                    name="talent"
                    required
                    value={values.talent}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.talent}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.talent}
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
                  <Form.Label>Photo/Video</Form.Label>
                  <div className="mb-3">
                    <div className="preview">
                      {previewImage && (
                        <div>
                          {isImage(filename) ? (
                            <img
                              key={previewImage}
                              src={previewImage}
                              alt="Preview"
                              style={{ width: "200px" }}
                            />
                          ) : (
                            <video
                              controls
                              className="video-preview"
                              style={{ maxHeight: "300px" }}
                              src={previewImage}
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue("file", event.currentTarget.files[0]);

                      // Reset previewImage

                      // Update the preview image or video
                      if (event.currentTarget.files[0]) {
                        setFileName(event.currentTarget.files[0].name);
                        if (isImage(event.currentTarget.files[0].name)) {
                          const fileReader = new FileReader();
                          fileReader.onloadend = () => {
                            setPreviewImage(fileReader.result);
                          };
                          fileReader.readAsDataURL(
                            event.currentTarget.files[0]
                          );
                        } else {
                          setPreviewImage(null); // Reset previewImage for video
                          setPreviewImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          ); // Set previewImage for video
                        }
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
