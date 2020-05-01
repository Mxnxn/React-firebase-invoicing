import React from "react";
import LiteHeader from "../../../Common/Header/LiteHeader";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardFooter,
} from "reactstrap";

import AsyncLoad from "global/AsyncLoad";
import LoaderComponent from "global/Loader/LoaderComponent";

import { clientsBackend } from "../client_backend";
import { materialsBackend } from "Views/Material/material_backend";

const Client = (props) => {
  const [uid] = React.useState(props.uid);
  // const [datex] = React.useState("");
  const [clientName, setclientName] = React.useState("");
  const [clientFirm, setclientFirm] = React.useState("");
  const [clientNumber, setclientNumber] = React.useState("");
  const [clientGST, setclientGST] = React.useState("");
  const [clientAddress, setclientAddress] = React.useState("");
  const [status, setstatus] = React.useState(false);

  const [exist, setFlag] = React.useState(false);
  const [objClients, setObj] = React.useState("");

  const [modal, setModal] = React.useState(false);
  const [clientid, setClientId] = React.useState("");
  const [deleteEntries, setDeleteEntries] = React.useState("");

  const [modal2, setModal2] = React.useState(false);

  const toggle = (e, id, entries) => {
    try {
      setClientId(id);
      setDeleteEntries(entries);
      setModal(!modal);
    } catch (err) {
      setModal(!modal);
    }
  };

  const editToggle = (e, detail) => {
    try {
      setClientId(detail.id);
      setclientAddress(detail.clientAddress);
      setclientFirm(detail.clientFirm);
      setclientGST(detail.clientGST);
      setclientName(detail.clientName);
      setclientNumber(detail.clientNumber);
      setModal2(!modal2);
    } catch (err) {
      setModal2(!modal2);
    }
  };

  const editClient = (e) => {
    try {
      let obj = {
        clientAddress: clientAddress,
        clientName: clientName,
        clientFirm: clientFirm,
        clientGST: clientGST,
        clientNumber: clientNumber,
      };
      clientsBackend.updateClient(clientid, obj);
      setClientId("");
      setclientAddress("");
      setclientFirm("");
      setclientGST("");
      setclientName("");
      setclientNumber("");
      setModal2(!modal2);
    } catch (err) {
      setClientId("");
      setclientAddress("");
      setclientFirm("");
      setclientGST("");
      setclientName("");
      setclientNumber("");
      alert(err);
      setModal2(!modal2);
    }
  };

  const deleteClient = (e) => {
    try {
      materialsBackend.getClientMaterials(clientid).then((ids) => {
        clientsBackend.deleteClient(clientid, deleteEntries, ids).then((ok) => {
          setModal(!modal);
          window.location.reload();
        });
      });
    } catch (err) {
      alert(err);
    }
  };

  function handleDate() {
    let dd = new Date().getDate();
    let mm = new Date().getMonth() + 1;
    let yyyy = new Date().getFullYear();

    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    return `${yyyy}-${mm}-${dd}`;
  }

  function handleSubmit(event) {
    setstatus(false);
    setFlag(false);
    let obj = {
      date: handleDate(),
      clientName: clientName,
      clientFirm: clientFirm,
      clientNumber: clientNumber,
      clientGST: clientGST,
      clientAddress: clientAddress,
    };

    let flag = true;
    if (objClients.length > 0) {
      for (let i = 0; i < objClients.length; i++) {
        if (objClients[i].clientGST === clientGST) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        clientsBackend.addNewClient(obj, uid).then((val) => {
          setstatus(true);
        });
      } else {
        setFlag(true);
      }
    } else
      clientsBackend.addNewClient(obj, uid).then((val) => {
        setstatus(true);
      });
  }

  return (
    <>
      <LiteHeader bg={"primary"} />
      <Container fluid className="mt--8">
        <Row>
          <Col className="order-xl-1 mt-2 ml-4" xl="5" responsive>
            <Card
              className={
                props.darkModeFlag === "false" ? "bg-default shadow" : "shadow"
              }
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Added
                    </h6>
                    <h2
                      className={
                        props.darkModeFlag === "false"
                          ? "text-white mb-0 "
                          : "text-default mb-0"
                      }
                    >
                      Customers/Clients
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <Table
                className={
                  props.darkModeFlag === "false"
                    ? "align-items-center table-dark table-flush"
                    : "align-items-center table table-flush"
                }
                responsive
              >
                <thead
                  className={
                    props.darkModeFlag === "false"
                      ? "thead-dark"
                      : "thead-light"
                  }
                >
                  <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Firm</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <AsyncLoad
                    promise={clientsBackend.getAllClient(uid)}
                    LoadComponent={LoaderComponent}
                  >
                    {(sheets, errors) => {
                      setObj(sheets);
                      return sheets.map((sheet) => {
                        return (
                          <tr
                            className={
                              props.darkModeFlag === "false"
                                ? "text-info"
                                : "text-warning"
                            }
                          >
                            <th scope="row">{sheet.clientName}</th>
                            <th scope="row" className="text-muted">
                              {sheet.clientFirm}
                            </th>
                            <th scope="row">
                              <Button
                                onClick={(e) =>
                                  toggle(e, sheet.id, sheet.entries)
                                }
                                size="sm"
                                color="danger"
                              >
                                <i className="fa fa-times"></i>
                              </Button>
                            </th>
                            <th scope="row">
                              <Button
                                onClick={(e) => editToggle(e, sheet)}
                                size="sm"
                                color="warning"
                              >
                                <i className="fa fa-edit"></i>
                              </Button>
                            </th>
                          </tr>
                        );
                      });
                    }}
                  </AsyncLoad>
                </tbody>
              </Table>
              <CardFooter
                className={props.darkModeFlag === "false" ? "bg-default" : ""}
              >
                <div className=" text-sm text-warning">
                  Note: Deleting this will remove all entries and materials
                </div>
                <div className="text-sm   mt-2  text-info">
                  Info: Please refresh after delete
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col className="order-xl-1 mt-2 ml-4" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Client/Customer</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="mr-3">
                <Form>
                  {status ? (
                    <div className="alert alert-success">
                      Successfully Added
                    </div>
                  ) : (
                    <></>
                  )}
                  {exist ? (
                    <div className="alert alert-danger">
                      Client/Customer is already exist with this GST Number
                    </div>
                  ) : (
                    <></>
                  )}
                  <h6 className="heading-small text-muted mb-4">
                    Personal information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={clientName}
                            name="clientName"
                            placeholder="Name"
                            onChange={(e) => setclientName(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Contact Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Phonenumber"
                            type="number"
                            name="clientNumber"
                            onChange={(e) => setclientNumber(e.target.value)}
                            value={clientNumber}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Address"
                            type="text"
                            name="clientAddress"
                            onChange={(e) => setclientAddress(e.target.value)}
                            value={clientAddress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Firm information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Firm Name"
                            type="text"
                            name="clientFirm"
                            onChange={(e) => setclientFirm(e.target.value)}
                            value={clientFirm}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            GST Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-city"
                            placeholder="GST Number"
                            type="text"
                            name="clientGST"
                            onChange={(e) => setclientGST(e.target.value)}
                            value={clientGST}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-right mb-3 ml-2 mt-2">
                    <Col lg="3">
                      <Button onClick={handleSubmit} color="primary">
                        Submit
                      </Button>
                    </Col>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className="bg-default" toggle={toggle}>
            <h3 className="text-white">Edit Details</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col>
                <h4 className="text-white">Are you sure?</h4>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-Danger"
              onClick={deleteClient}
            >
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-primary"
              onClick={toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={modal2} toggle={editToggle}>
          <ModalHeader className="bg" toggle={editToggle}>
            <h3 className="text">Delete Material/Product</h3>
          </ModalHeader>
          <Container fluid>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-name">
                      Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      value={clientName}
                      name="clientName"
                      placeholder="Name"
                      onChange={(e) => setclientName(e.target.value)}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-email">
                      Contact Number
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="Phonenumber"
                      type="number"
                      name="clientNumber"
                      onChange={(e) => setclientNumber(e.target.value)}
                      value={clientNumber}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="11">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-first-name"
                      placeholder="Address"
                      type="text"
                      name="clientAddress"
                      onChange={(e) => setclientAddress(e.target.value)}
                      value={clientAddress}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <div className="pl-lg-4">
              <Row>
                <Col md="11">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-address"
                      placeholder="Firm Name"
                      type="text"
                      name="clientFirm"
                      onChange={(e) => setclientFirm(e.target.value)}
                      value={clientFirm}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="11">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      GST Number
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue=""
                      id="input-city"
                      placeholder="GST Number"
                      type="text"
                      name="clientGST"
                      onChange={(e) => setclientGST(e.target.value)}
                      value={clientGST}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Container>
          <ModalFooter className="bg">
            <Button
              color="primary"
              className="btn btn-success"
              onClick={editClient}
            >
              Edit
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-primary"
              onClick={editToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Client;
