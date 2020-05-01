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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    return (
      <footer
        className={
          this.props.darkModeFlag === "false"
            ? "footer"
            : "footer bg-gradient-primary"
        }
      >
        <Row
          className={
            this.props.darkModeFlag === "false"
              ? "align-items-center justify-content-xl-between"
              : "align-items-center  text-white  text-primary justify-content-xl-between"
          }
        >
          <Col xl="6">
            <div className="copyright text-center text-xl-left ">
              © 2020{" "}
              <a
                className={
                  this.props.darkModeFlag === "false"
                    ? "font-weight-bold text-primary  ml-1"
                    : "font-weight-bold text-white ml-1 "
                }
                href="https://mxnxn.herokuapp.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Mxnxn inc.
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav
              className={
                this.props.darkModeFlag === "false"
                  ? "nav-footer justify-content-center  justify-content-xl-end"
                  : "nav-footer justify-content-center  text-white justify-content-xl-end"
              }
            >
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/vandit.soni.90"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i
                    className={
                      this.props.darkModeFlag === "false"
                        ? "fab fa-facebook-square fa-2x "
                        : "fab fa-facebook-square fa-2x text-white"
                    }
                  ></i>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://instagram.com/manangraphics"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i
                    className={
                      this.props.darkModeFlag === "false"
                        ? "fab fa-instagram fa-2x "
                        : "fab fa-instagram fa-2x text-white"
                    }
                  ></i>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://manangraphics.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i
                    className={
                      this.props.darkModeFlag === "false"
                        ? "fa fa-globe fa-2x"
                        : "fa fa-globe fa-2x text-white"
                    }
                  ></i>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
