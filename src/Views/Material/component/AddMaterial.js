import React from "react";

import LiteHeader from "../../../Common/Header/LiteHeader";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";

import { materialsBackend } from "../material_backend";
import { clientsBackend } from "../../Client/client_backend";
import { firebase } from "../../../FirebaseAuth/Firebase";
import AsyncLoad from "global/AsyncLoad";
import LoadComponent from "../../../global/Loader/LoaderComponent";
import Loader from "../../../global/Loader/Loader";
import DropdownList from "global/DropdownList";

const AddMaterial = (props) => {
  const [uid, setUid] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [clientId, setClientId] = React.useState("");
  const [name, setName] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [status, setStatus] = React.useState(false);

  function handleSubmit(e) {
    materialsBackend
      .addNewMaterial(name, rate, clientId)
      .then((ok) => {
        setStatus(true);
      })
      .catch((err) => {
        alert(err);
      });
  }

  React.useEffect(() => {
    firebase.isInitialized((user) => {
      if (user) {
        setUid(user.uid);
        setLoading(true);
      }
    });
  });

  function clientChange(e) {
    setClientId(e.target.value);
  }

  function nameChange(e) {
    setName(e.target.value);
  }

  function rateChange(e) {
    setRate(e.target.value);
  }

  return loading ? (
    <>
      <LiteHeader bg={"primary"} />

      <Row>
        <Col xl="2"></Col>
        <Col className="order-xl-1 mt--7 ml-4" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add Material</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="mr-3">
              {status ? (
                <div className="alert alert-success">Successfully added</div>
              ) : (
                <></>
              )}
              <h6 className="heading-small text-muted mb-4">
                Material information
              </h6>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Select Client
                        </label>
                        <AsyncLoad
                          promise={clientsBackend.getClientNames(uid)}
                          LoadComponent={LoadComponent}
                        >
                          {(clients, errors) => {
                            return (
                              <DropdownList
                                className="form-control-alternative"
                                clients={clients}
                                placeholder="Client-Names"
                                type="text"
                                onChange={(e) => clientChange(e)}
                              />
                            );
                          }}
                        </AsyncLoad>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Material
                        </label>
                        <Input
                          className="form-control-alternative"
                          onChange={(e) => nameChange(e)}
                          placeholder="Material"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Rate
                        </label>
                        <Input
                          className="form-control-alternative"
                          onChange={(e) => rateChange(e)}
                          placeholder="Rate"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-left ml-4">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  );
};

export default AddMaterial;
