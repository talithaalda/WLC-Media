import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import axios from "axios";
import { useProfile } from "@/utils/profileContext";
function DashboardProfile() {
  const {
    handleSubmit,
    companyName,
    location,
    linkMaps,
    email,
    instagram,
    phone,
    updateSuccess,
    fetchData,
    handleError,
    setUpdateSuccess,
  } = useProfile();
  useEffect(() => {
    fetchData();
  }, []);

  const { Formik } = formik;

  const schema = yup.object().shape({
    company: yup.string().required("Company is required"),
    location: yup.string().required("Location is required"),
    linkMaps: yup.string().url().required("Link Maps is required"),
    email: yup.string().email().required("Email is required"),
    instagram: yup.string().required("Instagram is required"),
    linkMaps: yup.string().url().required("Link Maps is required"),
    phone: yup.string().required("Phone is required"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          company: companyName,
          location: location,
          linkMaps: linkMaps,
          email: email,
          instagram: instagram,
          phone: phone,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <main>
            <Container className="container-form">
              <h4 className="pb-3">Edit Profile</h4>
              {updateSuccess && (
                <CustomAlert
                  variant="success"
                  message="Data updated successfully!"
                  onClose={() => setUpdateSuccess(false)}
                />
              )}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="validationCustom01">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    name="company"
                    required
                    value={values.company}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.company}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.company}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={values.location}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Instagram</Form.Label>

                  <InputGroup>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Instagram"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="instagram"
                      value={values.instagram}
                      onChange={(event) => {
                        handleError(event);
                      }}
                      isInvalid={!!errors.instagram}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.instagram}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4" controlId="validationCustom02">
                  <Form.Label>Link Maps</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Link Maps"
                    name="linkMaps"
                    value={values.linkMaps}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.linkMaps}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.linkMaps}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button className="btn btn-wlc" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Container>
          </main>
        )}
      </Formik>
    </>
  );
}

export default DashboardProfile;
