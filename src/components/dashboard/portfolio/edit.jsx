import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomAlert from "../../AlertComponents";
import Link from "next/link";
import ButtonComponents from "@/components/ButtonComponents";
import { usePortfolio } from "@/utils/portfolioContext";
function EditPortfolio() {
  const { Formik } = formik;
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [categoryId, setCategoryId] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [filename, setFileName] = useState(null);
  const {
    isImage,
    fetchDataById,
    porto,
    sow,
    talent,
    handleUpdate,
    handleError,
    title,
    updateSuccess,
    setUpdateSuccess,
  } = usePortfolio();

  useEffect(() => {
    fetchDataById();
    // fetchCategoryData();
  }, [id]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    sow: yup.string().required("Brand is required"),
    talent: yup.string().required("Talent is required"),
    // categoryId: yup.number().required("Category is required"),
    file: yup
      .mixed()
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
        onSubmit={handleUpdate}
        initialValues={{
          title: title,
          // categoryId: categoryId,
          sow: sow,
          talent: talent,
          // file: {},
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <main>
            <Container className="container-form">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Edit Portfolio</h4>
                <Link href="/dashboard/portfolio">
                  <ButtonComponents textButton="Back"></ButtonComponents>
                </Link>
              </div>
              {updateSuccess && (
                <CustomAlert
                  variant="success"
                  message="Data updated successfully!"
                  onClose={() => setUpdateSuccess(false)}
                />
              )}
              <Form
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Form.Group className="mb-4">
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
                <Form.Group className="mb-4">
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
                <Form.Group className="mb-4">
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
                {/* <Form.Group className="mb-4">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    required
                    name="categoryId"
                    value={values.categoryId}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.categoryId}
                  >
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
                <Form.Group md="6" className="mb-4">
                  <Form.Label>Photo/Video</Form.Label>
                  <div className="mb-3">
                    <div className="preview">
                      {previewImage ? (
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
                      ) : porto.filename ? (
                        <>
                          {isImage(porto.filename) ? (
                            <div className="d-flex flex-column">
                              <Card.Img
                                key={values.file} // You can use file name as the key
                                variant="top"
                                src={`/api/portfolio/image/${porto.filename}`}
                                style={{ width: "200px" }}
                              />
                            </div>
                          ) : (
                            <video
                              controls
                              className="video-preview"
                              style={{ maxHeight: "300px" }}
                            >
                              <source
                                src={`/api/portfolio/image/${porto.filename}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </>
                      ) : null}
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
