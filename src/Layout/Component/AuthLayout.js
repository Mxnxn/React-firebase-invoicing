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
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Fade } from "reactstrap";

// core components
import AuthNavbar from "../../Common/Navbars/AuthNavbar";
import AuthFooter from "../../Common/Footers/AuthFooter.js";

import routes from "../../authroutes";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
          exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <Fade>
          <div className="main-content">
            <AuthNavbar />
            <div className="header bg-gradient-info py-7 py-lg-8">
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-default"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </div>
            {/* Page content */}
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Switch>
                  {this.getRoutes(routes)}
                  <Redirect exact from="*" to="/auth/login" />
                </Switch>
              </Row>
            </Container>
          </div>
          <AuthFooter />
        </Fade>
      </>
    );
  }
}

export default Auth;