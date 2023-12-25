import ButtonComponents from "@/components/ButtonComponents";
import HeaderAuthComponent from "@/components/HeaderAuthComponent";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Alert, Container, Form, Navbar } from "react-bootstrap";
const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
const Forgot = () => {
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleForgot = async (values, { setSubmitting }) => {
    try {
      // Send a request to your server to handle the forgot password functionality
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Handle success, e.g., display a success message or redirect
        console.log("Password reset email sent successfully!");
        setSendSuccess(true);
      } else {
        // Handle errors, e.g., display an error message
        setError("Email doesn't exist");
      }
    } catch (error) {
      setError(error.message);
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
        className="h-100 gradient-form "
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
                        <h4 className="mt-1 mb-5 pb-1">Forgot Password</h4>
                      </div>

                      <Formik
                        initialValues={{
                          email: "",
                        }}
                        validationSchema={Schema}
                        onSubmit={handleForgot}
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
                            {sendSuccess && (
                              <Alert variant="success">
                                Password reset email sent successfully!
                              </Alert>
                            )}
                            {error && (
                              <Alert variant="danger" className="mt-3">
                                {error}
                              </Alert>
                            )}
                            <p>Enter your email to send link</p>
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

                            {/* <Form.Floating className="form-outline mb-4 position-relative">
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
                            </Form.Floating> */}

                            <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                              <ButtonComponents
                                textButton="Send Email"
                                type="submit"
                                disabled={isSubmitting}
                              />
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">Forgot password?</p>
                              <Link
                                href="/admin/forgot-password"
                                type="button"
                                className="btn btn-outline-danger"
                              >
                                Forgot
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

export default Forgot;