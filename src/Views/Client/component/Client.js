import React from "react";

import LiteHeader from "../../../Common/Header/LiteHeader";
import { firebase } from "../../../FirebaseAuth/Firebase";
import { clientsBackend } from "../client_backend";

import { Card, CardHeader, Table, Row, CardFooter } from "reactstrap";
import AsyncLoad from "../../../global/AsyncLoad";
import LoaderComponent from "../../../global/Loader/LoaderComponent";
import Loader from "../../../global/Loader/Loader";

import CLientListItem from "./ClientListItem";

const Client = props => {
  const [loading, setLoading] = React.useState(false);
  const [uid, setUid] = React.useState("");

  React.useEffect(() => {
    firebase.isInitialized(user => {
      if (user) {
        setUid(user.uid);
        setLoading(true);
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
              <h3 className="text-white mb-0">Clients/Customers</h3>
            </CardHeader>
            <Table
              className="align-items-center table-dark table-flush"
              responsive
            >
              <thead className="thead-dark">
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
                    console.log(sheets);
                    return sheets.map(sheet => (
                      <CLientListItem client={sheet} />
                    ));
                  }}
                </AsyncLoad>
              </tbody>
            </Table>
            <CardFooter className="bg-default">
              <div class="col-xl-9 text-warning text-left">
                <span className="badge bg">Tap names for entries</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Row>
    </>
  ) : (
    <Loader />
  );
};

export default Client;
