import React from "react";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Container,
} from "reactstrap";

import LiteHeader from "Common/Header/LiteHeader";
import { userBackend } from "../user_backend";

const UserProfileDetail = (props) => {
  const uid = props.uid;
  const [status, setStatus] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userFirm, setUserFirm] = React.useState("");
  const [userPhone, setUserPhone] = React.useState("");
  const [userAddress, setUserAddress] = React.useState("");
  const [userGST, setUserGST] = React.useState("");

  const handleSubmit = (e) => {
    let obj = {
      name: username,
      email: userEmail,
      firm: userFirm,
      phone: userPhone,
      address: userAddress,
      gst: userGST,
      url: "",
    };
    userBackend.getUserDetail(uid).then((user) => {
      if (user) {
        userBackend.updateUserDetail(user.id, obj);
      } else {
        userBackend.addUserData(uid, obj);
      }
      setStatus(true);
    });
  };

  React.useEffect(() => {
    userBackend.getUserDetail(uid).then((user) => {
      if (user) {
        setUsername(user.name);
        setUserPhone(user.phone);
        setUserFirm(user.firm);
        setUserEmail(user.email);
        setUserAddress(user.address);
        setUserGST(user.gst);
        setUpdate(true);
      }
    });
  }, [uid]);

  return (
    <>
      <LiteHeader bg={"primary"} />
      <Container className="mt--9" fluid>
        <Row>
          <Col xl="2"></Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Details</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  {update ? (
                    <div className="alert alert-info">
                      Note: These will override your details and may affect your
                      Invoice.
                    </div>
                  ) : (
                    <></>
                  )}
                  {status ? (
                    <div className="alert alert-success">
                      Successfully Saved.
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="xyz@mail.com"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firm-name"
                          >
                            Firm Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-firm-name"
                            placeholder="e.g Facebook Inc."
                            type="text"
                            value={userFirm}
                            onChange={(e) => setUserFirm(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone-number"
                          >
                            Contact Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-number"
                            placeholder="+12 1234567890"
                            type="text"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  {/* {error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    <></>
                  )} */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Address"
                            type="text"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gst"
                          >
                            GST Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-gst"
                            placeholder="24EYJPSBLABLA2Z2"
                            type="text"
                            value={userGST}
                            onChange={(e) => setUserGST(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Button color="primary" onClick={handleSubmit}>
                        Upload
                      </Button>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfileDetail;
