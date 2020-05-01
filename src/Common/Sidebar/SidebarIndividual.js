import React, { Component } from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";

import { PropTypes } from "prop-types";
// nodejs library to set properties for components
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Navbar,
  NavItem,
  NavbarBrand,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
export default class Sidebar extends Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.props = props;

    this.activeRoute.bind(this);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  // createLinks = routes => {
  //   return routes.map((prop, key) => {
  //     return (
  //       <NavItem key={key}>
  //         <NavLink
  //           to={prop.layout + prop.path}
  //           tag={NavLinkRRD}
  //           onClick={this.closeCollapse}
  //           activeClassName="active"
  //         >
  //           <i className={prop.icon} />
  //           {prop.name}
  //         </NavLink>
  //       </NavItem>
  //     );
  //   });
  // };

  render() {
    let { clientid } = this.props;
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavbarBrand className="pt-0">
            <img
              className="navbar-brand-img"
              src={require("assets/img/brand/logo.png")}
              alt="LOGO"
            />
          </NavbarBrand>

          {/* Collapse */}
          <Collapse navbar isOpen={false}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" type="button">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <hr className="my-3" />
            {/* Heading */}
            <h6 className="navbar-heading text-muted">Features</h6>
            {/* Navigation */}
            <Nav navbar>
              <NavItem>
                <NavLink
                  to={`/client/${clientid}/`}
                  tag={NavLinkRRD}
                  activeClassName="active"
                >
                  <i className="ni ni-app text-primary" />
                  Dashboard
                </NavLink>
              </NavItem>
            </Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <h6 className="navbar-heading text-muted">More</h6>
            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink href="/invoice" activeClassName="active">
                  <i className="ni ni-ungroup text-primary" />
                  Invoice
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  uid: PropTypes.string,
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};
