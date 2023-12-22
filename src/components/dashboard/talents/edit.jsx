import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomAlert from "../../AlertComponents";
import axios from "axios";
function EditTalents() {
  const { Formik } = formik;
  const [talent, setTalent] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { id } = router.query;
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
        setTalent(data);
      } catch (error) {
        console.error("Error fetching talent data:", error);
      }
    };
    fetchDataById();
  }, [id, talent]);
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
        console.error("Error fetching talent data:", error);
      }
    };

    fetchData();
  }, []);
  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    console.log("hai");
    try {
      const response = await axios.put(`/api/talent/${id}`, {
        name: values.name,
        categoryId: Number(values.categoryId),
        userIG: values.userIG,
        userTikTok: values.userTikTok,
        startfromIG: Number(values.startfromIG),
        startfromTikTok: Number(values.startfromTikTok),
        follIG: Number(values.follIG),
        follTikTok: Number(values.follTikTok),
        ERIG: Number(values.ERIG),
        ERTikTok: Number(values.ERTikTok),
      });

      if (response.status === 200) {
        console.log("Data updated successfully");
        setUpdateSuccess(true);
        resetForm();
        const updatedDataResponse = await fetch(`/api/talent/${id}`);
        const updatedData = await updatedDataResponse.json();
        setTalent(updatedData);
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
    name: yup.string().required("Field is required"),
    categoryId: yup.string().required("Field is required"),
    userIG: yup.string().required("Field is required"),
    userTikTok: yup.string().required("Field is required"),
    startfromIG: yup.number().required("Field is required"),
    startfromTikTok: yup.number().required("Field is required"),
    follIG: yup.number().required("Field is required"),
    follTikTok: yup.number().required("Field is required"),
    ERIG: yup.number().required("Field is required"),
    ERTikTok: yup.number().required("Field is required"),
    // file: yup.mixed().required(),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleUpdate}
        initialValues={{
          name: talent.name || "",
          categoryId: talent.categoryId || "",
          userIG: talent.userIG || "",
          userTikTok: talent.userTikTok || "",
          startfromIG: talent.startfromIG || "",
          startfromTikTok: talent.startfromTikTok || "",
          follIG: talent.follIG || "",
          follTikTok: talent.follTikTok || "",
          ERIG: talent.ERIG || "",
          ERTikTok: talent.ERTikTok || "",
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <main>
            <Container className="container-form">
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
                    onChange={handleChange}
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
                    value={values.categoryId}
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
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Username Instagram</Form.Label>

                  <InputGroup>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username Instagram"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="userIG"
                      value={values.userIG}
                      onChange={handleChange}
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
                    onChange={handleChange}
                    isInvalid={!!errors.follIG}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.follIG}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Engagements Rate IG</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Engagements Rate IG"
                    name="ERIG"
                    value={values.ERIG}
                    onChange={handleChange}
                    isInvalid={!!errors.ERIG}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ERIG}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Start From IG</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Start From IG"
                    name="startfromIG"
                    value={values.startfromIG}
                    onChange={handleChange}
                    isInvalid={!!errors.startfromIG}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startfromIG}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Username TikTok</Form.Label>

                  <InputGroup>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username TikTok"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="userTikTok"
                      value={values.userTikTok}
                      onChange={handleChange}
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
                    onChange={handleChange}
                    isInvalid={!!errors.follTikTok}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.follTikTok}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Engagements Rate TikTok</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Engagements Rate TikTok"
                    name="ERTikTok"
                    value={values.ERTikTok}
                    onChange={handleChange}
                    isInvalid={!!errors.ERTikTok}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ERTikTok}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Start from TikTok</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Start from TikTok"
                    name="startfromTikTok"
                    value={values.startfromTikTok}
                    onChange={handleChange}
                    isInvalid={!!errors.startfromTikTok}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startfromTikTok}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="6" className="mb-4" controlId="formFile">
                  <Form.Label>Photo Talent</Form.Label>
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
