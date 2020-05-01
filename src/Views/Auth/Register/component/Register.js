import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { authBackend } from "../../../../Backend/backend/Auth";
import { withRouter } from "react-router-dom";
const Register = props => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [weak, setWeak] = React.useState(true);
  const [medium, setMedium] = React.useState(false);
  const [strong, setStrong] = React.useState(false);
  function passwordCheck(e) {
    const re = new RegExp("^([a-zA-Z0-9@?!.*#]{8,15})$");
    const re1 = new RegExp("^([a-zA-Z0-9]{6,15})$");
    if (e.target.value.length < 7) {
      setMedium(false);
      setWeak(true);
      setStrong(false);
    }
    if (re.test(e.target.value)) {
      setStrong(true);
      setWeak(false);
      setMedium(false);
    }
    if (re1.test(e.target.value)) {
      setMedium(true);
      setWeak(false);
      setStrong(false);
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      passwordCheck(e);
                    }}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  {weak ? (
                    <span className="text-danger font-weight-700">Weak</span>
                  ) : null}
                  {medium ? (
                    <span className="text-primary font-weight-700">Medium</span>
                  ) : null}
                  {strong ? (
                    <span className="text-success font-weight-700">Strong</span>
                  ) : null}
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={onRegister}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="/auth/login"
              onClick={e => e.preventDefault()}
            >
              <small>Already have an Account?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );

  async function onRegister() {
    try {
      await authBackend.Register(name, email, password);
      props.history.replace("/auth/login");
    } catch (error) {
      alert(error);
    }
  }
};

export default withRouter(Register);
