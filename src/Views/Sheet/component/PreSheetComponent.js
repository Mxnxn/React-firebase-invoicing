import React, { useState, useEffect } from "react";
import SheetComponent from "./SheetComponent";
import Footer from "Common/Footers/AdminFooter";
import { Container } from "reactstrap";
import AsyncLoad from "global/AsyncLoad";
import { clientsBackend } from "Views/Client/client_backend";
import Loader from "react-spinners/ScaleLoader";
import LoaderX from "global/Loader/Loader";
import LiteHeader from "Common/Header/LiteHeader";
import { Row, Col } from "reactstrap";
const PreSheetComponents = (props) => {
  const [date] = useState(props.match.params.id);
  const [uid] = useState(props.uid);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (uid) setLoading(true);
  }, [loading, uid]);

  return loading ? (
    <>
      <LiteHeader bg="primary" />
      <Container
        className={props.darkModeFlag === "false" ? "" : "bg-gradient-primary"}
        fluid
      >
        <Row style={{ marginTop: -15 + "rem" }}>
          <Col lg="12">
            <h1
              className="text-white text-weight-bold"
              style={{ fontSize: "40px" }}
            >
              Date: {date}
            </h1>
          </Col>
        </Row>
        <AsyncLoad
          promise={clientsBackend.getAllClientWithDate(uid, date)}
          LoadComponent={Loader}
        >
          {(clients, errors) => {
            return clients.map((client, index) => (
              <SheetComponent
                darkModeFlag={props.darkModeFlag}
                key={index}
                id={date}
                uid={uid}
                client={client}
              />
            ));
          }}
        </AsyncLoad>
      </Container>

      <Container
        className={props.darkModeFlag === "false" ? "" : "bg-gradient-primary"}
        fluid
      >
        <Footer
          darkModeFlag={props.darkModeFlag === "false" ? "false" : "true"}
        />
      </Container>
    </>
  ) : (
    <LoaderX />
  );
};

export default PreSheetComponents;
