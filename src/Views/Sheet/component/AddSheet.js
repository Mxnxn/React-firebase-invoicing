import React from "react";
import LiteHeader from "../../../Common/Header/LiteHeader";
import { sheetsBackend } from "../sheet_backend";
import { firebase } from "../../../FirebaseAuth/Firebase";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
export default class AddSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      date: "",
      status: "none"
    };

    firebase.isInitialized(user => {
      if (user) {
        this.setState({ uid: user.uid });
      } else {
        props.history.replace("/admin/login");
      }
    });

    this.backend = sheetsBackend;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  dateChange(e) {
    this.setState({ date: e.target.value });
  }

  handleSubmit(e) {
    let flag = true;
    let sheets = this.backend.getSheets(this.state.uid);
    sheets.then(ok => {
      for (let i = 0; i < ok.length; i++) {
        let sheet = ok[i];
        if (sheet.date === this.state.date) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        this.backend
          .addNewSheet(this.state.date, this.state.uid)
          .then(val => {});
        this.setState({ status: true });
        this.forceUpdate();
      } else {
        this.setState({ status: false });
        this.forceUpdate();

        // this.props.history.goBack();
      }
    });
    e.preventDefault();
  }

  render() {
    return (
      <>
        <LiteHeader />
        <Col className="order-xl-1 mt--7 ml-4" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add Sheet</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="mr-3">
              <Form onSubmit={this.handleSubmit}>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      {this.state.status === true ? (
                        <FormGroup>
                          <div className="alert alert-success">
                            Successfully Added
                          </div>
                        </FormGroup>
                      ) : (
                        <></>
                      )}
                      {this.state.status === false ? (
                        <FormGroup>
                          <div className="alert alert-info">Already Exist</div>
                        </FormGroup>
                      ) : (
                        <></>
                      )}
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Date
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.date}
                          onChange={this.dateChange}
                          placeholder="Username"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="text-left ml-4">
                  <input className="btn btn-primary" type="submit" />
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
