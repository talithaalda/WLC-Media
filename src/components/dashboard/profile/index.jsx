import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import CustomAlert from "../../AlertComponents";
import axios from "axios";
function DashboardProfile() {
  const [profile, setProfile] = useState([]);
  const profileId = profile && profile.length > 0;
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile/1");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log(profile);
      if (profile !== null) {
        // Jika data sudah ada, lakukan update
        const response = await axios.put(`/api/profile/1`, {
          // Ganti dengan properti id yang sesuai
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
        });
        console.log("Data berhasil diupdate:", response.data);
      } else {
        // Jika data belum ada, lakukan create
        const response = await axios.post("/api/profile/create", {
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
        });
        console.log("Data berhasil ditambahkan:", response.data);
      }

      setUpdateSuccess(true);
    } catch (error) {
      console.error("Gagal mengelola data:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const { Formik } = formik;

  const schema = yup.object().shape({
    company: yup.string().required(),
    location: yup.string().required(),
    linkMaps: yup.string().url().required(),
    // phone: yup.number().required(),
    email: yup.string().email().required(),
    instagram: yup.string().required(),
    linkMaps: yup.string().url().required(),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          company: profile.companyName || "",
          location: profile.location || "",
          linkMaps: profile.companyName || "",
          // phone: profile.companyName || "",
          email: profile.email || "",
          instagram: profile.email || "",
          linkMaps: profile.linkMaps || "",
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    type="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
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
