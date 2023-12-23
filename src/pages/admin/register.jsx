import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Alert, Form } from "react-bootstrap";
import ButtonComponents from "../../components/ButtonComponents.jsx";
import { useState } from "react";
import Link from "next/link";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import HeaderAuthComponent from "../../components/HeaderAuthComponent.jsx";
import { useRouter } from "next/router";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Retype Password is required"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleSubmit = async (values, { setSubmitting }) => {
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
          pathname: "/admin/login",
          query: { loginSuccess: true },
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
      <Navbar expand="lg" style={{ backgroundColor: "white" }}>
        <Container>
          <Navbar.Brand href="#home" className="me-0">
            <img
              src="/images/logo-horizontal-color.png"
              alt="logo"
              width="160px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 mt-5">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="/images/logo-icon.png"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          Register Dashboard Admin
                        </h4>
                      </div>

                      <Formik
                        initialValues={{
                          name: "",
                          email: "",
                          password: "",
                          retypePassword: "",
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <p>Create your account</p>
                            <Form.Floating className="form-outline mb-4">
                              <Field
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Username"
                              />
                              <label htmlFor="name">Name</label>
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </Form.Floating>
                            <Form.Floating className="form-outline mb-4">
                              <Field
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="name@example.com"
                              />
                              <label htmlFor="email">Email address</label>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </Form.Floating>
                            <Form.Floating className="form-outline mb-4 position-relative">
                              <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                              />
                              <label htmlFor="password">Password</label>
                              <div
                                className="password-toggle position-absolute top-50 translate-middle-y"
                                style={{ left: "91%" }}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </Form.Floating>
                            <Form.Floating className="form-outline mb-4 position-relative">
                              <Field
                                type={showRePassword ? "text" : "password"}
                                name="retypePassword"
                                className="form-control"
                                placeholder="Retype Password"
                              />
                              <label htmlFor="retypePassword">
                                Retype Password
                              </label>
                              <div
                                className="password-toggle position-absolute top-50 translate-middle-y"
                                style={{ left: "91%" }}
                                onClick={() =>
                                  setShowRePassword(!showRePassword)
                                }
                              >
                                {showRePassword ? <BsEyeSlash /> : <BsEye />}
                              </div>
                              <ErrorMessage
                                name="retypePassword"
                                component="div"
                                className="text-danger"
                              />
                            </Form.Floating>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                              <ButtonComponents textButton="Register" />
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">
                                Do you have an account?
                              </p>
                              <Link
                                href="/admin/login"
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                Log In
                              </Link>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <HeaderAuthComponent></HeaderAuthComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
