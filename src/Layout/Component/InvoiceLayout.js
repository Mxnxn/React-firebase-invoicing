import React from "react";
import LiteHeader from "../../Common/Header/LiteHeader";
import OneDayInvoice from "../../Views/Invoice/Component/OneDayInvoice";
import RandomInvoice from "../../Views/Invoice/Component/RandomInvoice";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Footer from "Common/Footers/AdminFooter";
export default class Invoice extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <LiteHeader />
        <Switch>
          <Route
            exact
            path="/invoice/:cid"
            render={(props) => <RandomInvoice {...props} />}
          />
          <Route
            exact
            path="/invoice/:cid/:date"
            render={(props) => <OneDayInvoice {...props} />}
          />
        </Switch>
        <Container fluid>
          <Footer />
        </Container>
      </>
    );
  }
}
