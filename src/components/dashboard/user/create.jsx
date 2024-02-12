import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import * as formik from "formik";
import { get } from "http";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import ButtonComponents from "@/components/ButtonComponents";

function CreateUser() {
  const router = useRouter();
  const { Formik } = formik;
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [role, setRole] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Retype Password is required"),
    role: yup.string().required("Role is required"),
  });
  const handleError = (event) => {
    // General function for formatting fields
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "retypePassword":
        setRetypePassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Registration successful
        router.push({
          pathname: "/dashboard/user",
          query: { createSuccess: true },
        });
        // Handle success, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        if (
          response.status === 400 &&
          errorData.message === "Email already in use"
        ) {
          // Handle email already in use error
          setError("Email is already in use");
        } else {
          // Handle other errors
          setError("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      // Handle other errors
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
          name: name,
          email: email,
          password: password,
          retypePassword: retypePassword,
          role: role,
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <main>
            <Container className="container-form">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Create User</h4>
                <Link href="/dashboard/user">
                  <ButtonComponents textButton="Back"></ButtonComponents>
                </Link>
              </div>
              <Form
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={values.name}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
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

                <Form.Group className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    required
                    name="role"
                    value={values.role}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.role}
                  >
                    <option value="" disabled>
                      --- Choose Role ---
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4 position-relative">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    required
                    value={values.password}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.password}
                  />
                  <div
                    className="password-toggle position-absolute "
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ top: "38px", right: "35px" }}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Retype Password Input */}
                <Form.Group className="mb-4 position-relative">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    type={showRePassword ? "text" : "password"}
                    placeholder="retypePassword"
                    name="retypePassword"
                    required
                    value={values.retypePassword}
                    onChange={(event) => {
                      handleError(event);
                    }}
                    isInvalid={!!errors.retypePassword}
                  />
                  <div
                    className="password-toggle position-absolute "
                    onClick={() => setShowRePassword(!showRePassword)}
                    style={{ top: "38px", right: "35px" }}
                  >
                    {showRePassword ? <BsEyeSlash /> : <BsEye />}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.retypePassword}
                  </Form.Control.Feedback>
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button className="btn btn-wlc" type="submit">
                  Update user
                </Button>
              </Form>
            </Container>
          </main>
        )}
      </Formik>
    </>
  );
}

export default CreateUser;
