import React, { useEffect } from "react";
/* eslint-disable */
import LiteHeader from "Common/Header/LiteHeader";
import Footer from "Common/Footers/AdminFooter";
import { Link } from "react-router-dom";
import { clientsBackend } from "../../Client/client_backend";
import AsyncLoad from "global/AsyncLoad";
import LoaderComponent from "global/Loader/LoaderComponent";
import { materialsBackend } from "../../Material/material_backend";
import Loader from "global/Loader/Loader";
import EntryHelper from "../../ClientEntry/clientEntry_helper";
import {
  Form,
  Input,
  Button,
  Row,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Container,
} from "reactstrap";
import { entryBackend } from "Views/ClientEntry/clientEntry_backend";
import { useState } from "react";

const AddEntryBySheet = (props) => {
  const [status, setStatus] = useState(false);
  const [clientid] = useState(props.match.params.id);
  const [date] = useState(props.match.params.date);

  const [darkModeFlag] = useState(window.localStorage.getItem("mode"));

  const [materialObj, setMaterialObj] = useState("");

  const [product, setProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState(Number(0));
  const [rate, setRate] = useState(Number(0));
  const [amount, setAmount] = useState(Number(0));
  const [cgst, setCgst] = useState(Number(6));
  const [total, setTotal] = useState(Number(6));
  const [receive, setReceive] = useState(Number(0));

  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    const setting = () => {
      if (clientid) {
        setStatus(true);
      }
      return;
    };
    setting();
  });

  function handleMaterialChange(e) {
    if (materialObj) {
      materialObj.forEach((material) => {
        if (material.material_name === e.target.value) {
          setProduct(material.material_name);
          setRate(material.material_rate);
          setAmount(material.material_rate * qty);
          setTotal(material.material_rate * qty);
        }
      });
    }
  }

  // function handleSubmit(e) {
  //   let x = new EntryHelper().toEntryForFireStore(
  //     clientid,
  //     date,
  //     product,
  //     desc,
  //     qty,
  //     rate,
  //     amount,
  //     cgst,
  //     cgst,
  //     total,
  //     receive
  //   );
  //   entryBackend.addNewEntry(x).then((e) => {
  //     props.history.goBack();
  //   });
  // }

  const [onSubmitFlag, setOnSubmitFlag] = React.useState(false);

  React.useEffect(() => {
    setEmptyError(false);
    if (onSubmitFlag) {
      if (!desc || !total || !amount || !qty) {
        setEmptyError(true);
        return;
      }
      let x = new EntryHelper().toEntryForFireStore(
        clientid,
        date,
        product,
        desc,
        qty,
        rate,
        amount,
        cgst,
        cgst,
        total,
        receive
      );
      entryBackend.addNewEntry(x).then((e) => {
        props.history.goBack();
      });
    }
  }, [onSubmitFlag]);

  return status ? (
    <>
      <Container fluid className="bg-gradient-primary">
        <LiteHeader bg="primary" />
        <Col className="order-xl-1 mt--9 mx-auto w-50" xl="11">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="10">
                  <h3 className="mb-0">Add Entry</h3>
                </Col>
                <Col xs="1" className="text-right">
                  <Link to={`/sheet/${date}`} className="btn btn-danger btn-sm">
                    Cancel
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="mr-3">
              <Form>
                {emptyError ? (
                  <div className="alert alert-danger">
                    Fields Can't be Empty
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
                          Date
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          placeholder="Name"
                          type="date"
                          readOnly
                          name="date"
                          value={date}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Material/Product
                        </label>
                        <AsyncLoad
                          promise={clientsBackend.getClientDetail(clientid)}
                          LoadComponent={LoaderComponent}
                        >
                          {(sheet, error) => {
                            return (
                              <AsyncLoad
                                promise={Promise.all(
                                  sheet.materials.map(
                                    materialsBackend.getMaterials
                                  )
                                )}
                                LoadComponent={LoaderComponent}
                              >
                                {(materials, error) => {
                                  setMaterialObj(materials);
                                  return (
                                    <select
                                      className="form-control form-control-alternative"
                                      onChange={handleMaterialChange}
                                      value={product}
                                    >
                                      <option value="0">Select</option>
                                      {materials.map((single) => (
                                        <option value={single.material_name}>
                                          {single.material_name}
                                        </option>
                                      ))}
                                    </select>
                                  );
                                }}
                              </AsyncLoad>
                            );
                          }}
                        </AsyncLoad>
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
                          Description
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Description"
                          type="text"
                          name="description"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Total Sq.Feet
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-address"
                          placeholder="Firm Name"
                          type="number"
                          name="qty"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                            setAmount(e.target.value * rate);
                            setTotal(
                              Number(e.target.value * rate) +
                                Number((e.target.value * rate * cgst) / 50)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          Rate
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          defaultValue=""
                          id="input-city"
                          placeholder="Rate"
                          type="number"
                          name="rate"
                          value={rate}
                          onChange={(e) => {
                            setRate(e.target.value);
                            setAmount(e.target.value * qty);
                            setTotal(
                              Number(e.target.value * qty) +
                                Number((e.target.value * qty * cgst) / 50)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Subtotal
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-address"
                          placeholder="Subtotal"
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                            let x =
                              Number(e.target.value) +
                              Number((e.target.value * cgst) / 50);
                            setTotal(x);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          CGST
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-address"
                          type="number"
                          name="cgst"
                          value={cgst}
                          onChange={(e) => {
                            setCgst(e.target.value);
                            // let x = Number(amount) + Number((amount * cgst) / 50);
                            setTotal(
                              Number(amount) +
                                Number((amount * e.target.value) / 50)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          SGST
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          defaultValue=""
                          id="input-city"
                          placeholder="Rate"
                          type="number"
                          name="sgst"
                          value={cgst}
                          onChange={(e) => {
                            setCgst(e.target.value);
                            setTotal((amount * e.target.value) / 50);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Total
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-address"
                          placeholder="Total"
                          type="number"
                          name="total"
                          value={total}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Advance
                        </label>
                        <Input
                          required
                          className="form-control-alternative"
                          id="input-address"
                          placeholder="Advance"
                          type="text"
                          name="receive"
                          value={receive}
                          onChange={(e) => {
                            let x =
                              Number(amount) + Number((amount * cgst) / 50);
                            setReceive(e.target.value);
                            setTotal(x - e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-right mb-3 ml-2 mt-2">
                  <Col lg="3">
                    <Button
                      onClick={(e) => setOnSubmitFlag(true)}
                      className="btn btn-primary btn-block"
                    >
                      Add
                    </Button>
                  </Col>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Container>
          <Footer />
        </Container>
      </Container>
    </>
  ) : (
    <Loader />
  );
};

export default AddEntryBySheet;
