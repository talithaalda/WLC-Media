// pages/reset-password.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Container, Form, Navbar } from "react-bootstrap";
import { ErrorMessage, Field, Formik } from "formik";
import ButtonComponents from "@/components/ButtonComponents";
import Link from "next/link";
import HeaderAuthComponent from "@/components/HeaderAuthComponent";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as yup from "yup";
const Schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Retype Password is required"),
});
const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState(null);
  const { token } = router.query;
  const handleResetPassword = async (values) => {
    try {
      const { password } = values;

      // Make a POST request to your reset password API route
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token || "", // Ensure token is not undefined or null
          newPassword: password,
        }),
      });

      if (response.ok) {
        // Reset password was successful
        router.push({
          pathname: "/admin/login",
          query: { loginSuccess: true },
        });
        console.log("Password reset successful");
      } else {
        if (response.status === 400) {
          setError("Invalid or expired token");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to reset password");
        }
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
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
                          password: "",
                          retypePassword: "",
                        }}
                        validationSchema={Schema}
                        onSubmit={handleResetPassword}
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
                            {error && (
                              <Alert variant="danger" className="mt-3">
                                {error}
                              </Alert>
                            )}
                            <p>Enter your new password</p>
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

                            <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                              <ButtonComponents
                                textButton="Reset Password"
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

export default ResetPassword;
