import React from "react";
/* eslint-disable */
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import AsyncLoad from "global/AsyncLoad";
import CLientListItem from "../Views/Client/component/ClientListItem";
import { clientsBackend } from "../Views/Client/client_backend";
import LoaderComponent from "global/Loader/LoaderComponent";
// core components

import Header from "../Common/Header/Header";
import { sheetsBackend } from "./Sheet/sheet_backend";
import SheetListItem from "./Sheet/component/SheetListItem";
import Loader from "global/Loader/Loader";
import { entryBackend } from "./ClientEntry/clientEntry_backend";

const Index = (props) => {
  const [uid] = React.useState(props.uid);
  const [loading, setLoading] = React.useState(false);
  const [lenClient, setLenClient] = React.useState("");
  // const [lenSheet, setLenSheet] = React.useState("");
  const [lenEntry, setLenEntry] = React.useState("");
  const [lenNewEntry, setLenNewEntry] = React.useState("");
  const [lenNewClient, setLenNewClient] = React.useState("");

  const [obj, setObj] = React.useState("");

  const [total, setTotal] = React.useState("");
  const [receive, setReceive] = React.useState("");

  const [currentTotal, setCurrentTotal] = React.useState("");
  const [currentReceived, setCurrentReceived] = React.useState("");

  React.useEffect(() => {
    setLenClient(obj.length);
    setLoading(true);
  }, [obj, lenClient, loading]);

  React.useEffect(() => {
    entryBackend.getAllEntry().then((entries) => {
      setLenEntry(entries.length);
      let temp = Number(0);
      let x = Number(0);
      let countEntries = Number(0);
      let total = Number(0);
      let rec = Number(0);
      entries.forEach((entry) => {
        let date = new Date().getMonth() + 1;
        date = date < 10 ? "0" + date : date;
        let j = entry.date.split("-");
        if (j[1] === date) {
          countEntries += 1;
          total += Number(entry.total);
          rec += Number(entry.receive);
        }
        temp = Number(temp) + Number(entry.total);
        x = Number(x) + Number(entry.receive);
      });
      setCurrentTotal(total);
      setCurrentReceived(rec);
      setLenNewEntry(countEntries);
      setReceive(x.toFixed(2).toString());
      setTotal(temp.toFixed(2).toString());
    });
  }, [lenEntry, receive, total, lenNewEntry]);

  React.useEffect(() => {
    let count = Number(0);
    clientsBackend.getAllClient(uid).then((clients) => {
      clients.forEach((client) => {
        let temp = client.date;
        temp = temp.split("-");
        let month = new Date().getMonth() + 1;
        month = month < 10 ? "0" + month : month;

        if (temp[1] === month) {
          count++;
        }
      });
      setLenNewClient(count);
    });
  }, [uid, lenNewClient]);

  return loading ? (
    <>
      <Header
        bg="primary"
        clients={lenClient}
        entries={lenEntry}
        receive={receive}
        total={total}
        newEntries={lenNewEntry}
        newClients={lenNewClient}
        curTotal={currentTotal}
        curRec={currentReceived}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card
              className={
                props.darkModeFlag === "false" ? "bg-default shadow" : "shadow"
              }
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
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
                    <th scope="col">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <AsyncLoad
                    promise={clientsBackend.getAllClient(uid)}
                    LoadComponent={LoaderComponent}
                  >
                    {(sheets, errors) => {
                      setObj(sheets);
                      return sheets.map((sheet, index) => (
                        <AsyncLoad
                          promise={Promise.all(
                            sheet.entries.map(entryBackend.getEntry)
                          )}
                          LoadComponent={LoaderComponent}
                        >
                          {(entries, errors) => {
                            return (
                              <CLientListItem
                                key={index}
                                darkModeFlag={props.darkModeFlag}
                                client={sheet}
                              />
                            );
                          }}
                        </AsyncLoad>
                      ));
                    }}
                  </AsyncLoad>
                </tbody>
              </Table>
              <CardFooter
                className={props.darkModeFlag === "false" ? "bg-default" : ""}
              >
                <div className="col-xl-9 text-warning text-left ml--3">
                  <span className="badge bg">*Tap names for entries</span>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="6">
            <Card
              className={
                props.darkModeFlag === "false" ? "bg-default shadow" : "shadow"
              }
            >
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      List of Entries
                    </h6>
                    <h2
                      className={
                        props.darkModeFlag === "false"
                          ? "text-white mb-0 "
                          : "text-default mb-0"
                      }
                    >
                      Dates
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
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <AsyncLoad
                    promise={sheetsBackend.getAllSheets(uid)}
                    LoadComponent={LoaderComponent}
                  >
                    {(sheets, errors) => {
                      return sheets.map((sheet, index) => (
                        <SheetListItem
                          key={index}
                          darkModeFlag={props.darkModeFlag}
                          date={sheet.date}
                          id={sheet.id}
                        />
                      ));
                    }}
                  </AsyncLoad>
                </tbody>
              </Table>
              <CardFooter
                className={props.darkModeFlag === "false" ? "bg-default" : ""}
              >
                <div className="col-xl-9 text-warning text-left ml--3">
                  <span className="badge bg">*Tap dates for entries</span>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <Loader />
  );
};

export default Index;
