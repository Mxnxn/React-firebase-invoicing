import React, { useState } from "react";
// react component that copies the given text inside your clipboard
// import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   UncontrolledTooltip
// } from "reactstrap";
// core components
import LiteHeader from "../../Common/Header/LiteHeader";
import { firebase } from "../../FirebaseAuth/Firebase";
import { Card, CardHeader, Table, Row } from "reactstrap";
import AsyncLoad from "../../global/AsyncLoad";
import { sheetsBackend } from "./sheet_backend";
import Loader from "../../global/Loader/LoaderComponent";
import LoaderComponent from "../../global/Loader/Loader";

import SheetListItem from "./component/SheetListItem";

const Sheet = props => {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    firebase.isInitialized(user => {
      if (user) {
        setUid(user.uid);
        setLoading(true);
      } else {
        props.history.replace("/auth/login");
      }
    });
  });

  return loading ? (
    <>
      <LiteHeader />
      <Row className="ml-3 mt--8">
        <div className="col">
          <Card className="bg-default w-50 shadow">
            <CardHeader className="bg-transparent border-0">
              <h3 className="text-white mb-0">Sheets</h3>
            </CardHeader>
            <Table
              className="align-items-center table-dark table-flush"
              responsive
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <AsyncLoad
                  promise={sheetsBackend.getAllSheets(uid)}
                  LoadComponent={Loader}
                >
                  {(sheets, errors) => {
                    return sheets.map(sheet => (
                      <SheetListItem date={sheet.date} id={sheet.id} />
                    ));
                  }}
                </AsyncLoad>
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </>
  ) : (
    <LoaderComponent />
  );
};

export default Sheet;
