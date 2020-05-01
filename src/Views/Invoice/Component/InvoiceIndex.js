import React, { useState, useEffect } from "react";
/* eslint-disable */
import LiteHeader from "Common/Header/LiteHeader";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Container,
  Col,
  Row,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  CardFooter,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import InvoicePagination from "./InvoicePagination";
import Main from "../Template/Main";

const InvoiceIndex = ({
  dataForInvoice,
  previewClick,
  invoice,
  darkModeFlag,
  previewFlag,
  previewCancel,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage, setInvoicesPerPage] = useState(
    window.localStorage.getItem("invoicesPerPage")
      ? window.localStorage.getItem("invoicesPerPage")
      : 10
  );

  const [initialIndexOfPage] = useState(
    currentPage * invoicesPerPage - invoicesPerPage
  );
  const [invoices, setInvoices] = useState(
    invoice.slice(initialIndexOfPage, currentPage * invoicesPerPage)
  );

  useEffect(() => {
    setInvoices(
      invoice.slice(
        currentPage * invoicesPerPage - invoicesPerPage,
        currentPage * invoicesPerPage
      )
    );
  }, [currentPage, invoicesPerPage]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onArrowbtnClick = (action) => {
    if (action === "prev") {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(currentPage + 1);
  };

  const [filteredInvoices, setInvoiceFilter] = useState(null);

  const [modal, setModal] = useState(false);

  const [max, setMax] = useState(0);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");

  const [thisMonthInvoices, setThisMonthInvoices] = useState("");

  useEffect(() => {
    let month = new Date().getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let counter = 0;
    for (let i = 0; i < invoice.length; i++) {
      let arr = invoice[i].date.split("-");
      if (arr[1] === month) {
        counter++;
      }
    }
    setThisMonthInvoices(counter);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setMax(invoice[invoice.length - 1].id);
  }, [max]);

  const searchFunc = () => {
    if (invoiceNo) {
      setInvoiceFilter(
        invoice.filter((el) => {
          return el.id.match(invoiceNo);
        })
      );
      setModal(!modal);
    } else {
      console.log(date);
      setInvoiceFilter(
        invoice.filter((el) => {
          return el.date.match(date);
        })
      );
      setModal(!modal);
    }
  };

  return (
    <>
      <LiteHeader bg="primary" />
      <Container className="mt--8" fluid>
        <Row>
          <Col lg="6" xl="3">
            <Card className="card-stats shadow-lg mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-sm text-muted mb-0"
                    >
                      Total Invoices
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {max ? max : 0}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="ni ni-archive-2" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up"></i> {thisMonthInvoices}
                  </span>
                  <span className="text-nowrap">invoices this month</span>
                </p>
                <p className="mt-1 mb-0 text-muted text-sm">
                  <span className="text-nowrap">
                    Next Invoice Number{" "}
                    <span className="text-success mr-2">
                      {Number(max) + Number(1)}
                    </span>
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt--3" fluid>
        <Row>
          <Col className="d-flex flex-row-reverse">
            {invoiceNo || date ? (
              <></>
            ) : (
              <Button
                size="sm"
                color={darkModeFlag === "false" ? "success" : "white"}
                onClick={(e) => setModal(!modal)}
              >
                <i className="fa fa-search"></i> Search
              </Button>
            )}
            {invoiceNo || date ? (
              <>
                <Button
                  size="sm"
                  color="danger"
                  onClick={(e) => {
                    setInvoiceNo("");
                    setInvoiceFilter("");
                    setDate("");
                  }}
                >
                  <i className="fa fa-times"></i> Cancel
                </Button>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xl="12">
            <Card
              className={
                darkModeFlag === "false" ? "bg-default shadow" : "shadow"
              }
            >
              <CardHeader className="bg-transparent">
                <Row>
                  <Col xl="11">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Issued
                    </h6>
                    <h2
                      className={
                        darkModeFlag === "false"
                          ? "text-white mb-0 "
                          : "text-default mb-0"
                      }
                    >
                      Invoices
                    </h2>
                  </Col>
                  <Col xl="1" className="flex-row-reverse d-flex">
                    <Nav>
                      <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                          <Row>
                            <button className="btn btn-sm btn-primary text-sm">
                              {invoicesPerPage}
                            </button>
                          </Row>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            onClick={(e) => {
                              setInvoicesPerPage(15);
                              window.localStorage.setItem(
                                "invoicesPerPage",
                                15
                              );
                            }}
                          >
                            <h5 className="text-muted">15</h5>
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => {
                              setInvoicesPerPage(50);
                              window.localStorage.setItem(
                                "invoicesPerPage",
                                50
                              );
                            }}
                          >
                            <h5 className="text-muted">50</h5>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Col>
                </Row>
              </CardHeader>
              <Table
                className={
                  darkModeFlag === "false"
                    ? "align-items-center table-dark table-flush"
                    : "align-items-center table table-flush"
                }
                responsive
              >
                <thead
                  className={
                    darkModeFlag === "false" ? "thead-dark" : "thead-light"
                  }
                >
                  <tr>
                    <th scope="col">Inv No</th>
                    <th scope="col">Date</th>
                    <th scope="col">To</th>
                    <th scope="col">Firm</th>
                    <th scope="col">Total</th>

                    <th scope="row">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices ? (
                    <>
                      {filteredInvoices.map((elem, i) => {
                        return (
                          <tr key={i + 1}>
                            <th scope="row">{elem.id}</th>
                            <th scope="row">{elem.date}</th>
                            <th scope="row">{elem.clientName}</th>
                            <th scope="row">{elem.clientFirm}</th>
                            <th scope="row">{elem.total}</th>
                            <th scope="row">
                              <Button
                                onClick={(e) => previewClick(elem)}
                                size="sm"
                                color="success"
                              >
                                <i className="fa fa-eye"></i>
                              </Button>
                            </th>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {invoices.map((elem, index) => {
                        return (
                          <tr key={index + 1}>
                            <th scope="row">{elem.id}</th>
                            <th scope="row">{elem.date}</th>
                            <th scope="row">{elem.clientName}</th>
                            <th scope="row">{elem.clientFirm}</th>
                            <th scope="row">{elem.total}</th>
                            <th scope="row">
                              <Button
                                onClick={(e) => previewClick(elem)}
                                size="sm"
                                color="success"
                              >
                                <i className="fa fa-eye"></i>
                              </Button>
                            </th>
                          </tr>
                        );
                      })}{" "}
                    </>
                  )}
                </tbody>
              </Table>
              <CardFooter
                className={darkModeFlag === "false" ? "bg-default" : ""}
              >
                <InvoicePagination
                  totalPosts={invoice.length}
                  invoicesPerPage={invoicesPerPage}
                  pageChange={pagination}
                  currentPage={currentPage}
                  pageChangeArrows={onArrowbtnClick}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {previewFlag ? (
          <Row className="mt-2">
            <Col xl="11" style={{ maxHeight: "350px", overflow: "hidden" }}>
              <Main invoice={dataForInvoice} />
            </Col>
            <Col xl="1" className="p-0">
              <Button size="sm" onClick={previewCancel} color="danger">
                {" "}
                <i className="fa fa-times"></i>
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Col md="4">
          <Modal
            className="modal-dialog-top modal-danger"
            contentClassName="bg-gradient-danger"
            isOpen={modal}
            toggle={toggle}
          >
            <ModalHeader toggle={toggle}>
              Your attention is required
            </ModalHeader>
            <ModalBody>
              <div className="text-center">
                <i className="fa fa-search fa-3x" />
                <h4 className="heading mt-2">Enter invoice number</h4>
                <Row>
                  <Col xl="3"></Col>
                  <Col xl="6">
                    {" "}
                    <Input
                      placeholder="0"
                      name="invoice_number"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                  </Col>
                </Row>
                <h4 className="heading mt-2">or</h4>
                <Row>
                  <Col xl="3"></Col>
                  <Col xl="6">
                    {" "}
                    <Input
                      placeholder="0"
                      type="date"
                      name="select_date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer">
              <Button
                className="btn-white"
                color="default"
                type="button"
                onClick={searchFunc}
              >
                Search
              </Button>
              <Button
                className="text-white ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Container>
    </>
  );
};

export default InvoiceIndex;
