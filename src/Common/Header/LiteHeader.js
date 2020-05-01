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

// reactstrap components
import { Container } from "reactstrap";

class LiteHeader extends React.Component {
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
            <div className="header-body"></div>
          </Container>
        </div>
      </>
    );
  }
}

export default LiteHeader;
