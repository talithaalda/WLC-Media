import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
function EditTalents() {
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.string().required(),
    userIG: yup.string().required(),
    userTikTok: yup.string().required(),
    startfromIG: yup.string().required(),
    startfromTikTok: yup.string().required(),
    follIG: yup.string().required(),
    follTikTok: yup.string().required(),
    ERIG: yup.string().required(),
    ERTikTok: yup.string().required(),
    file: yup.mixed().required(),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          name: "",
          category: "",
          userIG: "",
          userTikTok: "",
          startfromIG: "",
          startfromTikTok: "",
          follIG: "",
          follTikTok: "",
          ERIG: "",
          ERTikTok: "",
          file: null,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <main>
            <Container className="container-form">
              <h4 className="pb-3">Edit Talent</h4>
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
                  <Form.Control
                    required
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  />
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
