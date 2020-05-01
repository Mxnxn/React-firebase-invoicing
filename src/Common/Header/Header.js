/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Loader from "global/Loader/LoaderComponent";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <>
        <div
          className={
            this.props.bg === "primary"
              ? "header bg-gradient-primary pb-8 pt-5 pt-md-8"
              : "header bg-gradient-info pb-8 pt-5 pt-md-8"
          }
        >
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Clients
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.clients ? (
                              this.props.clients
                            ) : this.props.clients === "0" ? (
                              0
                            ) : (
                              <Loader />
                            )}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-user-circle" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />{" "}
                          {this.props.newClients}
                        </span>{" "}
                        <span className="text-nowrap">added this month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Overall Entries
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.entries ? (
                              this.props.entries
                            ) : this.props.entries === 0 ? (
                              0
                            ) : (
                              <Loader />
                            )}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-book" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" />{" "}
                          {this.props.newEntries}
                        </span>{" "}
                        <span className="text-nowrap">This month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Due <span>(*inc Taxes)</span>
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.total ? (
                              <span
                                className={
                                  this.props.total.length > 7 ? "text-sm" : ""
                                }
                              >
                                &#8377;{this.props.total}
                              </span>
                            ) : this.props.total === 0 ? (
                              0
                            ) : (
                              <Loader />
                            )}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-share-square" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          &#8377;
                          {this.props.curTotal}
                        </span>
                        <span className="text-nowrap">this month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Paid
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.receive ? (
                              <span
                                className={
                                  this.props.receive.length > 7 ? "text-sm" : ""
                                }
                              >
                                &#8377;{this.props.receive}
                              </span>
                            ) : this.props.receive === 0 ? (
                              0
                            ) : (
                              <Loader />
                            )}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-check" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          &#8377;{this.props.curRec}
                        </span>{" "}
                        <span className="text-nowrap">this month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
