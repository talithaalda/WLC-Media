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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [linkMaps, setLinkMaps] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile/1");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCompanyName(data.companyName);
        setLocation(data.location);
        setLinkMaps(data.linkMaps);
        setEmail(data.email);
        setInstagram(data.instagram);
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "company":
        setCompanyName(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "linkMaps":
        setLinkMaps(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "instagram":
        setInstagram(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log(profile);
      if (profile.length !== 0) {
        // Jika data sudah ada, lakukan update
        const response = await axios.put(`/api/profile/1`, {
          // Ganti dengan properti id yang sesuai
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
        });
      } else {
        // Jika data belum ada, lakukan create
        const response = await axios.post("/api/profile/create", {
          companyName: values.company,
          location: values.location,
          linkMaps: values.linkMaps,
          email: values.email,
          instagram: values.instagram,
        });
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
    company: yup.string().required("Company is required"),
    location: yup.string().required("Location is required"),
    linkMaps: yup.string().url().required("Link Maps is required"),
    email: yup.string().email().required("Email is required"),
    instagram: yup.string().required("Instagram is required"),
    linkMaps: yup.string().url().required("Link Maps is required"),
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
                    type="Email"
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
