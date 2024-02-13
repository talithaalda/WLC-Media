import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import Link from "next/link";
import ButtonComponents from "@/components/ButtonComponents";
import { useTalent } from "@/utils/talentContext";
import { useRouter } from "next/router";
function EditTalents() {
  const { Formik } = formik;
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const {
    handleFormat,
    handleUpdate,
    fetchDataById,
    name,
    category,
    userIG,
    userTikTok,
    startfromIG,
    startfromTikTok,
    follIG,
    follTikTok,
    ERIG,
    ERTikTok,
    updateSuccess,
    setUpdateSuccess,
    talent,
  } = useTalent();
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/api/category-talent");
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch data");
    //     }

    //     const data = await response.json();
    //     setCategory(data);
    //   } catch (error) {
    //     console.error("Error fetching talent data:", error);
    //   }
    // };
    // fetchData();
    fetchDataById();
  }, [id]);

  const schema = yup.object().shape({
    name: yup.string().required("Field is required"),
    category: yup.string().required("Field is required"),
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
          category: category,
          // categoryId: categoryId,
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
              <div className="d-flex align-items-center justify-content-between">
                <h4>Edit Talent</h4>
                <Link href="/dashboard/talents">
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
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    name="category"
                    required
                    value={values.category}
                    onChange={(event) => {
                      handleFormat(event);
                    }}
                    isInvalid={!!errors.category}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group className="mb-4" controlId="validationCustom02">
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
                </Form.Group> */}
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
                  Update Talent
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
