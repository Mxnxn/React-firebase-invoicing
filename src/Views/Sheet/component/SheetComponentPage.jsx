import React, { useState } from "react";
/* eslint-disable */
import { Link } from "react-router-dom";
import { Button, Table, Row, Card, CardHeader, Col } from "reactstrap";
import { userBackend } from "Views/UserProfile/user_backend";

import SheetTableItems from "./SheetTableItems";
const SheetComponentPage = (props) => {
  const [client] = useState(props.client ? props.client : "");
  const [entries] = useState(props.entry);
  const [copy_entries] = useState(props.entry);

  const [date] = useState(props.entry[0] ? props.entry[0].date : "error");
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    userBackend.getUserDetail(props.uid).then((data) => {
      setUser(data);
    });
  }, [user, props.uid]);

  function getTotalforDisplay(arr) {
    let statex = { cgst: "", sgst: "", total: "", receive: "" };
    let temp = arr;
    for (let entry of temp) {
      statex["cgst"] =
        Number(statex["cgst"]) +
        Number(entry["amount"] * (entry["cgst"] / 100));
      statex["sgst"] =
        Number(statex["sgst"]) +
        Number(entry["amount"] * (entry["sgst"] / 100));
      statex["total"] = Number(statex["total"]) + Number(entry["total"]);
      statex["receive"] = Number(statex["receive"]) + Number(entry["receive"]);
    }
    return statex;
  }

  return (
    <>
      <Row className="mt-3">
        <Col>
          <Card
            className={
              props.darkModeFlag === "false" ? "bg-default shadow" : "bg shadow"
            }
          >
            <CardHeader className="bg-transparent border-0">
              <Row>
                <div className="col-xl-9">
                  <h3
                    className={
                      props.darkModeFlag === "false"
                        ? "text-white"
                        : "text-default"
                    }
                  >
                    {client.clientFirm}{" "}
                    <span className="ml-3 heading text-muted">
                      {client.clientName}
                    </span>
                  </h3>
                </div>
                <div className="col-xl-1">
                  <Link
                    className="btn-sm btn  btn-warning"
                    to={`/sheet/${client.id}/entry/new/${date}`}
                  >
                    Add Entry
                  </Link>
                </div>

                <div className="col-xl-1 text-center">
                  {/* <Link
                    className="badge btn  btn-primary"
                    to={`/invoice/${client.id}/${date}`}
                  >
                    Invoice
                  </Link> */}
                  <Button
                    size="sm"
                    color="primary"
                    onClick={(e) => {
                      props.invoice(
                        e,
                        client,
                        copy_entries,
                        getTotalforDisplay(copy_entries),
                        user
                      );
                    }}
                  >
                    Invoice
                  </Button>
                </div>
                <div className="col-xl-1 text-center">
                  <Link to={""} className="btn-sm btn btn-danger">
                    Download
                  </Link>
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
                  props.darkModeFlag === "false" ? "thead-dark" : "thead-light"
                }
              >
                <tr>
                  <th scope="col">Invoiced</th>
                  <th scope="col">Product</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Rate(&#8377;)</th>
                  <th scope="col">SubTotal(&#8377;)</th>
                  <th scope="col">CGST(&#8377;)</th>
                  <th scope="col">SGST(&#8377;)</th>
                  <th scope="col">Due(&#8377;)</th>
                  <th scope="col">Received(&#8377;)</th>
                  <th scope="col">Recieve/Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <SheetTableItems
                    key={index}
                    entry={entry}
                    toggle={props.toggle}
                    editRedirect={props.editRedirect}
                    deleteToggle={props.deleteToggle}
                  />
                ))}
              </tbody>
            </Table>

            {/* <CardFooter className="bg-default">
              <div class="col-xl-9 text-warning text-left">
                <span className="badge bg">*Tap names to add new entry</span>
              </div>
            </CardFooter> */}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SheetComponentPage;
