import React from "react";
import LiteHeader from "../../../Common/Header/LiteHeader";
import LoaderComponent from "global/Loader/LoaderComponent";

import { Link } from "react-router-dom";
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
import { materialsBackend } from "../../Material/material_backend";
import AsyncLoad from "global/AsyncLoad";
import { clientsBackend } from "../../Client/client_backend";
import Footer from "Common/Footers/AdminFooter";
import EntryHelper from "../clientEntry_helper";
import { sheetsBackend } from "../../Sheet/sheet_backend";
import { entryBackend } from "../clientEntry_backend";

export default class AddEntry extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.storage = window.localStorage;
    this.darkModeFlag = this.storage.getItem("mode");
    this.client_id = props.match.params.id;
    this.materials = "";
    this.entryHelper = new EntryHelper();
    this.sheetsData = sheetsBackend;
    this.backend = entryBackend;
    this.uid = props.match.params.uid;
    this.state = {
      date: "",
      product: "",
      description: "",
      qty: 0,
      rate: 0,
      amount: 0,
      cgst: 0,
      sgst: 0,
      total: 0,
      receive: 0,
    };
    this.flag = false;
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlecGstChange = this.handlecGstChange.bind(this);
    this.handlesGstChange = this.handlesGstChange.bind(this);
    this.handleReceiveChange = this.handleReceiveChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.checkFlag = this.checkFlag.bind(this);
  }

  handleSubmit(event) {
    let entry = this.entryHelper.toEntryForFireStore(
      this.client_id,
      this.state.date,
      this.state.product,
      this.state.description,
      this.state.qty,
      this.state.rate,
      this.state.amount,
      this.state.cgst,
      this.state.cgst,
      this.state.total,
      this.state.receive
    );

    let flag = true;
    let sheets = this.sheetsData.getSheets(this.uid);
    sheets.then((ok) => {
      for (let i = 0; i < ok.length; i++) {
        let sheet = ok[i];
        if (sheet.date === this.state.date) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag)
        this.backend.addNewEntry(entry).then((ok) => {
          this.sheetsData.addNewSheet(this.state.date, this.uid);
          this.props.history.goBack();
        });
      // console.log("NOT EXISTS");
      else
        this.backend.addNewEntry(entry).then((ok) => {
          this.props.history.goBack();
        });
    });

    this.setState({ ...this.state, sending: true });
    event.preventDefault();
  }

  checkFlag() {}

  handleMaterialChange(event) {
    this.materials.forEach((entry) => {
      if (event.target.value === entry.material_name) {
        this.setState({
          product: entry.material_name,
          rate: entry.material_rate,
        });
      }
    });
  }

  handlecGstChange(event) {
    this.setState({ cgst: event.target.value });
    let x = parseFloat(this.state.amount * ((event.target.value * 2) / 100));
    x = x + parseFloat(this.state.amount);
    this.setState({ total: parseFloat(x).toFixed(2) });
  }

  handlesGstChange(event) {
    this.setState({ sgst: event.target.value });
  }

  handleDateChange(date) {
    this.setState({ date: date.target.value });
  }

  handleProductChange(event) {
    this.setState({ product: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleQtyChange(event) {
    this.setState({
      qty: event.target.value,
      amount: (event.target.value * this.state.rate).toFixed(2),
    });
  }

  handleRateChange(event) {
    this.setState({
      ...this.state,
      rate: event.target.value,
      amount: parseFloat(event.target.value * this.state.qty).toFixed(2),
    });
  }

  handleAmountChange(data) {
    this.setState({
      amount: data.target.value.toFixed(2),
    });
  }

  handleReceiveChange(event) {
    const totalx =
      Number(this.state.amount) +
      Number(this.state.amount * (this.state.cgst / 50));
    let receive = event.target.value;
    if (receive === "") {
      this.setState({
        receive: "",
        total: totalx,
      });
    } else {
      let sub = totalx - event.target.value;
      if (sub < 0) {
        sub = 0;
      }
      this.setState({
        receive: receive,
        total: sub,
      });
    }
  }
  // className={
  //   this.darkModeFlag === "false"
  //     ? "order-xl-1 mt--9 bg-gradient-primary"
  //     : "order-xl-1 mt--9 "
  // }

  render() {
    return (
      <>
        <Container
          fluid
          className={this.darkModeFlag === "false" ? "bg-gradient-primary" : ""}
        >
          <LiteHeader bg="primary" />
          <div
            className={
              this.darkModeFlag === "false"
                ? "order-xl-1 mt--9 bg-gradient-primary"
                : "order-xl-1 mt--9 "
            }
          >
            <Row>
              <Col xl="3"></Col>
              <Col xl="6">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Add Entry</h3>
                      </Col>
                      <Col className="text-right">
                        <Link
                          to={`/client/${this.client_id}/`}
                          className="btn btn-danger btn-sm"
                        >
                          Cancel
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="mr-3">
                    <Form onSubmit={this.handleSubmit}>
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
                                name="date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
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
                                promise={clientsBackend.getClientDetail(
                                  this.client_id
                                )}
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
                                        this.materials = materials;
                                        return (
                                          <select
                                            className="form-control form-control-alternative"
                                            onChange={this.handleMaterialChange}
                                            value={this.state.product}
                                          >
                                            <option value="0">Select</option>
                                            {materials.map((single, index) => (
                                              <option
                                                key={index}
                                                value={single.material_name}
                                              >
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
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
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
                                Quantity
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Firm Name"
                                type="number"
                                name="qty"
                                value={this.state.qty}
                                onChange={this.handleQtyChange}
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
                                className="form-control-alternative"
                                defaultValue=""
                                id="input-city"
                                placeholder="Rate"
                                type="number"
                                name="rate"
                                value={this.state.rate}
                                onChange={this.handleRateChange}
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
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Subtotal"
                                type="number"
                                name="amount"
                                value={this.state.amount}
                                onChange={this.handleAmountChange}
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
                                className="form-control-alternative"
                                id="input-address"
                                type="number"
                                name="cgst"
                                value={this.state.cgst}
                                onChange={this.handlecGstChange}
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
                                className="form-control-alternative"
                                defaultValue=""
                                id="input-city"
                                placeholder="Rate"
                                type="number"
                                name="sgst"
                                value={this.state.cgst}
                                onChange={this.handlecGstChange}
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
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Total"
                                type="number"
                                name="total"
                                value={this.state.total}
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
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Advance"
                                type="text"
                                name="receive"
                                value={this.state.receive}
                                onChange={this.handleReceiveChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <div className="text-right mb-3 ml-2 mt-2">
                        <Col lg="3">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Submit
                          </Button>
                        </Col>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          <Container
            fluid
            className={
              this.darkModeFlag === "false" ? "" : "bg-gradient-primary "
            }
          >
            <Footer />
          </Container>
        </Container>
      </>
    );
  }
}
