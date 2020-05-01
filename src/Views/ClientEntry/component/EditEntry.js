import React from "react";
import LiteHeader from "../../../Common/Header/LiteHeader";
import Loader from "global/Loader/Loader";
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
  Container
} from "reactstrap";
import { materialsBackend } from "../../Material/material_backend";
import AsyncLoad from "global/AsyncLoad";
import { clientsBackend } from "../../Client/client_backend";
import Footer from "Common/Footers/AdminFooter";
import EntryHelper from "../clientEntry_helper";
import { sheetsBackend } from "../../Sheet/sheet_backend";
import { entryBackend } from "../clientEntry_backend";

export default class EditEntry extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.entry_id = props.match.params.id;
    this.materials = "";
    this.entryHelper = new EntryHelper();
    this.sheetsData = sheetsBackend;
    this.backend = entryBackend;
    this.client_id = props.match.params.uid;
    this.state = {
      loading: false,
      entry: ""
    };

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
  }

  componentWillMount() {
    entryBackend.getEntry(this.entry_id).then(entry => {
      this.setState({ entry: entry, loading: true });
    });
  }

  handleSubmit(event) {
    try {
      entryBackend.updateEntry(this.state.entry);
      this.props.history.replace(`/client/${this.client_id}`);
    } catch (err) {
      console.log(err);
    }
  }

  handleMaterialChange(event) {
    this.materials.forEach(entry => {
      if (event.target.value === entry.material_name) {
        let temp = this.state.entry;
        temp.product = entry.material_name;
        temp.rate = entry.material_rate;
        temp.amount = temp.qty * temp.rate;
        temp.total =
          temp.amount + temp.amount * (temp.cgst / 50) - temp.receive;
        this.setState({
          entry: temp
        });
      }
    });
  }

  handlecGstChange(event) {
    let temp = this.state.entry;
    temp.cgst = event.target.value;
    this.setState({ entry: temp });
    let x = parseFloat(temp.amount * ((event.target.value * 2) / 100));
    x = x + parseFloat(temp.amount);
    temp.total = x;
    this.setState({ entry: temp });
  }

  handlesGstChange(event) {
    let temp = this.state.entry;
    temp.sgst = event.target.value;
    this.setState({ entry: temp });
  }

  handleDateChange(date) {
    let temp = this.state.entry;
    temp.date = date.target.value;
    this.setState({ entry: temp });
  }

  handleProductChange(event) {
    let temp = this.state.entry;
    temp.product = event.target.value;
    this.setState({ entry: temp });
  }
  handleDescriptionChange(event) {
    let temp = this.state.entry;
    temp.description = event.target.value;
    this.setState({ entry: temp });
  }

  handleQtyChange(event) {
    let temp = this.state.entry;
    temp.qty = event.target.value;
    temp.amount = event.target.value * temp.rate;
    this.setState({ entry: temp });
  }

  handleRateChange(event) {
    let temp = this.state.entry;
    temp.rate = event.target.value;
    temp.amount = parseFloat(event.target.value * temp.qty);
    this.setState({
      entry: temp
    });
  }

  handleAmountChange(data) {
    let temp = this.state.entry;
    temp.amount = data.target.value;
    this.setState({
      entry: temp
    });
  }

  handleReceiveChange(event) {
    let temp = this.state.entry;
    const totalx =
      Number(this.state.entry.amount) +
      Number(this.state.entry.amount * (this.state.entry.cgst / 50));
    let receive = event.target.value;
    if (receive === "") {
      temp.total = totalx;
      temp.receive = "";
      this.setState({
        entry: temp
      });
    } else {
      let sub = totalx - event.target.value;
      if (sub < 0) {
        sub = 0;
      }
      temp.receive = receive;
      temp.total = sub;
      this.setState({
        entry: temp
      });
    }
  }

  render() {
    return this.state.loading ? (
      <>
        <LiteHeader />
        <Col className="order-xl-1 mt--9 mx-auto w-50" xl="11">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="10">
                  <h3 className="mb-0">Edit Entry</h3>
                </Col>
                <Col xs="1" className="text-right">
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
              <Form>
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
                          className="form-control-alternative"
                          placeholder="Name"
                          type="date"
                          name="date"
                          value={this.state.entry.date}
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
                                      value={this.state.entry.product}
                                    >
                                      {materials.map(single => (
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
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Description"
                          type="text"
                          name="description"
                          value={this.state.entry.description}
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
                          Total Sq.Feet
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-address"
                          placeholder="Firm Name"
                          type="number"
                          name="qty"
                          value={this.state.entry.qty}
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
                          value={this.state.entry.rate}
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
                          value={this.state.entry.amount}
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
                          value={this.state.entry.cgst}
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
                          value={this.state.entry.cgst}
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
                          value={this.state.entry.total}
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
                          value={this.state.entry.receive}
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
                      onClick={this.handleSubmit}
                      className="btn btn-primary btn-block"
                    >
                      Save
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
      </>
    ) : (
      <Loader />
    );
  }
}
