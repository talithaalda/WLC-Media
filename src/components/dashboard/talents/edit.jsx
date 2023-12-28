import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomAlert from "../../AlertComponents";
import axios from "axios";
import currencyFormatter from "currency-formatter";
function EditTalents() {
  const { Formik } = formik;
  const [talent, setTalent] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { id } = router.query;
  const [startfromTikTok, setStartfromTikTok] = useState("");
  const [startfromIG, setStartfromIG] = useState("");
  const [startfromTikTokRaw, setStartfromTikTokRaw] = useState("");
  const [startfromIGRaw, setStartfromIGRaw] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userIG, setUserIG] = useState("");
  const [userTikTok, setUserTikTok] = useState("");
  const [follIG, setFollIG] = useState("");
  const [follTikTok, setFollTikTok] = useState("");
  const [ERIG, setERIG] = useState("");
  const [ERTikTok, setERTikTok] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleFormat = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    let numericValue, formattedValue;
    switch (name) {
      case "startfromIG":
        numericValue = value.replace(/\D/g, "");
        formattedValue = currencyFormatter.format(numericValue, {
          code: "IDR",
        });
        setStartfromIG(formattedValue);
        setStartfromIGRaw(numericValue);
        break;
      case "startfromTikTok":
        numericValue = value.replace(/\D/g, "");
        formattedValue = currencyFormatter.format(numericValue, {
          code: "IDR",
        });
        setStartfromTikTok(formattedValue);
        setStartfromTikTokRaw(numericValue);
        break;
      case "name":
        setName(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      case "userIG":
        setUserIG(value);
        break;
      case "userTikTok":
        setUserTikTok(value);
        break;
      case "follIG":
        setFollIG(value);
        break;
      case "follTikTok":
        setFollTikTok(value);
        break;
      case "ERIG":
        setERIG(value);
        break;
      case "ERTikTok":
        setERTikTok(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        if (!id) {
          return;
        }
        const rute = `/api/talent/${id}`;
        const response = await fetch(rute);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setName(data.name);
        setCategoryId(data.categoryId);
        setUserIG(data.userIG);
        setUserTikTok(data.userTikTok);
        setFollIG(data.follIG);
        setFollTikTok(data.follTikTok);
        setERIG(data.ERIG);
        setERTikTok(data.ERTikTok);
        setStartfromIG(
          currencyFormatter.format(data.startfromIG, { code: "IDR" })
        );
        setStartfromTikTok(
          currencyFormatter.format(data.startfromTikTok, { code: "IDR" })
        );
        setStartfromIGRaw(data.startfromIG);
        setStartfromTikTokRaw(data.startfromTikTok);

        setTalent(data);
      } catch (error) {
        console.error("Error fetching talent data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("/api/category-talent");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching talent data:", error);
      }
    };
    fetchDataById();
    fetchData();
  }, [id]);
  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    let responseCreate = "";

    try {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        const responseUpload = await axios.post(
          `/api/talent/image/edit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Dapatkan path dan filename dari respons upload
        const { path, filename } = responseUpload.data;
        responseCreate = await axios.put(`/api/talent/${id}`, {
          name: values.name,
          categoryId: Number(values.categoryId),
          userIG: values.userIG,
          userTikTok: values.userTikTok,
          startfromIG: Number(startfromIGRaw),
          startfromTikTok: Number(startfromTikTokRaw),
          follIG: values.follIG,
          follTikTok: values.follTikTok,
          ERIG: Number(values.ERIG),
          ERTikTok: Number(values.ERTikTok),
          path: path,
          filename: filename,
        });
      } else {
        responseCreate = await axios.put(`/api/talent/${id}`, {
          name: values.name,
          categoryId: Number(values.categoryId),
          userIG: values.userIG,
          userTikTok: values.userTikTok,
          startfromIG: Number(startfromIGRaw),
          startfromTikTok: Number(startfromTikTokRaw),
          follIG: values.follIG,
          follTikTok: values.follTikTok,
          ERIG: Number(values.ERIG),
          ERTikTok: Number(values.ERTikTok),
        });
      }
      if (responseCreate.status === 200) {
        setUpdateSuccess(true);
        setTalent(responseCreate.data);
      } else {
        throw new Error("Failed to update data");
      }
      setPreviewImage(null);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const schema = yup.object().shape({
    name: yup.string().required("Field is required"),
    categoryId: yup.string().required("Field is required"),
    userIG: yup.string().required("Field is required"),
    userTikTok: yup.string().required("Field is required"),
    startfromIG: yup.string().required("Field is required"),
    startfromTikTok: yup.string().required("Field is required"),
    follIG: yup.string().required("Field is required"),
    follTikTok: yup.string().required("Field is required"),
    ERIG: yup.number().required("Field is required"),
    ERTikTok: yup.number().required("Field is required"),
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
          const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

          // Periksa tipe file berdasarkan "type" property pada berkas
          return allowedImageTypes.includes(value.type);
        }
      ),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleUpdate}
        initialValues={{
          name: name,
          categoryId: categoryId,
          userIG: userIG,
          userTikTok: userTikTok,
          startfromIG: startfromIG,
          startfromTikTok: startfromTikTok,
          follIG: follIG,
          follTikTok: follTikTok,
          ERIG: ERIG,
          ERTikTok: ERTikTok,
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <main>
            <Container className="container-form-talent">
              <h4 className="pb-3">Edit Talent</h4>
              {updateSuccess && (
                <CustomAlert
                  variant="success"
                  message="Data updated successfully!"
                  onClose={() => setUpdateSuccess(false)}
                />
              )}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => {
                      handleFormat(event);
                    }}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    required
                    name="categoryId"
                    onChange={(event) => {
                      handleFormat(event);
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
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label>Username Instagram</Form.Label>

                      <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username Instagram"
                          aria-describedby="inputGroupPrepend"
                          required
                          name="userIG"
                          value={values.userIG}
                          onChange={(event) => {
                            handleFormat(event);
                          }}
                          isInvalid={!!errors.userIG}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.userIG}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Followers IG</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Followers IG"
                        name="follIG"
                        value={values.follIG}
                        onChange={(event) => {
                          handleFormat(event);
                        }}
                        isInvalid={!!errors.follIG}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.follIG}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Engagements Rate IG</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Engagements Rate IG"
                          name="ERIG"
                          value={values.ERIG}
                          onChange={(event) => {
                            handleFormat(event);
                          }}
                          isInvalid={!!errors.ERIG}
                        />
                        <InputGroup.Text id="inputGroupPrepend">
                          %
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.ERIG}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Start From IG</Form.Label>
                      <Form.Control
                        required
                        type="text" // Change type to text
                        placeholder="Start From IG"
                        name="startfromIG"
                        value={values.startfromIG}
                        onChange={(event) => {
                          handleFormat(event);
                        }}
                        isInvalid={!!errors.startfromIG}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startfromIG}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-4"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label>Username TikTok</Form.Label>

                      <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username TikTok"
                          aria-describedby="inputGroupPrepend"
                          required
                          name="userTikTok"
                          value={values.userTikTok}
                          onChange={(event) => {
                            handleFormat(event);
                          }}
                          isInvalid={!!errors.userTikTok}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.userTikTok}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Followers TikTok</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Followers TikTok"
                        name="follTikTok"
                        value={values.follTikTok}
                        onChange={(event) => {
                          handleFormat(event);
                        }}
                        isInvalid={!!errors.follTikTok}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.follTikTok}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Engagements Rate TikTok</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Engagements Rate TikTok"
                          name="ERTikTok"
                          value={values.ERTikTok}
                          onChange={(event) => {
                            handleFormat(event);
                          }}
                          isInvalid={!!errors.ERTikTok}
                        />
                        <InputGroup.Text id="inputGroupPrepend">
                          %
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.ERTikTok}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="validationCustom02">
                      <Form.Label>Start from TikTok</Form.Label>
                      <Form.Control
                        required
                        type="text" // Change type to text
                        placeholder="Start from TikTok"
                        name="startfromTikTok"
                        value={values.startfromTikTok}
                        onChange={(event) => {
                          handleFormat(event);
                        }}
                        isInvalid={!!errors.startfromTikTok}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startfromTikTok}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group md="6" className="mb-4" controlId="formFile">
                  <Form.Label>Photo Talent</Form.Label>
                  <div className="mb-3" style={{ width: "30%" }}>
                    {previewImage ? (
                      <div className="d-flex flex-column">
                        <Card.Img
                          key={values.file} // You can use file name as the key
                          src={previewImage}
                          alt="Preview"
                        />
                      </div>
                    ) : talent.path ? (
                      <div className="d-flex flex-column">
                        <Card.Img
                          variant="top"
                          src={`/api/talent/image/${talent.filename}`}
                        />
                      </div>
                    ) : null}
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
                </Form.Group>

                <Button className="btn btn-wlc" type="submit">
                  Create Talent
                </Button>
              </Form>
            </Container>
          </main>
        )}
      </Formik>
    </>
  );
}

export default EditTalents;
