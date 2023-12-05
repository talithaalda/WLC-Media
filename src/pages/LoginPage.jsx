import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import ButtonComponents from "../components/ButtonComponents.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import HeaderAuthComponent from "../components/HeaderAuthComponent.jsx";
export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here, such as validating the passwords match, and handling the registration process.
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
        className="h-100 gradient-form mt-5"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
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

                      <form onSubmit={handleSubmit}>
                        <p>Create your account</p>
                        <Form.Floating className="form-outline mb-4">
                          <Form.Control
                            id="form2Example11"
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="form2Example11">Email address</label>
                        </Form.Floating>
                        <Form.Floating className="form-outline mb-4 position-relative">
                          <Form.Control
                            id="form2Example22"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="form2Example22">Password</label>
                          <div
                            className="password-toggle position-absolute top-50 translate-middle-y"
                            style={{ left: "91%" }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                          </div>
                        </Form.Floating>

                        <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                          <ButtonComponents textButton="Register" />
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Do you have an account?</p>
                          <Link
                            to="/dashboard/register"
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create
                          </Link>
                        </div>
                      </form>
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
