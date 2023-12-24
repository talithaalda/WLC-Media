import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Alert, Form } from "react-bootstrap";
import ButtonComponents from "../../components/ButtonComponents.jsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import HeaderAuthComponent from "../../components/HeaderAuthComponent.jsx";
import { useRouter } from "next/router.js";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    // Redirect to dashboard if the user is already authenticated
    if (session) {
      router.push("/dashboard/portfolio");
    }
  }, [session, router]);
  useEffect(() => {
    setLoginSuccess(router.query.loginSuccess === "true");
    if (router.query.loginSuccess === "true") {
      const { pathname, query } = router;
      const newQuery = { ...query };
      delete newQuery.loginSuccess;
      router.replace({ pathname, query: newQuery });
    }
  }, []);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!result.error) {
        console.log("Login successful");
      } else {
        // Set loginError based on the error returned by signIn
        if (
          result.error === "User not found" ||
          result.error === "Invalid password"
        ) {
          setLoginError(result.error);
        } else {
          setLoginError("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginError("Login failed. Please try again.");
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
                        <h4 className="mt-1 mb-5 pb-1">
                          Login Dashboard Admin
                        </h4>
                      </div>
                      {loginSuccess && (
                        <Alert variant="success">
                          Register successfully, please login!
                        </Alert>
                      )}
                      <Formik
                        initialValues={{
                          email: "",
                          password: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleLogin}
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
                            <p>Login to your account</p>
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
                            {loginError && (
                              <Alert variant="danger" className="mt-3">
                                {loginError}
                              </Alert>
                            )}
                            <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                              <ButtonComponents
                                textButton="Login"
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

export default RegisterPage;
