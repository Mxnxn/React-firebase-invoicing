import React from "react";
/* eslint-disable */

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
  Media,
  Navbar,
  NavItem,
  NavbarBrand,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // function activeRoute(routeName) {
  //   return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // }
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, text) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
            className={text}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  let { routes, more_routes } = props;
  return (
    <Navbar
      className={
        props.darkModeFlag === "false"
          ? "navbar-vertical fixed-left navbar-light"
          : `navbar-vertical fixed-left navbar-light bg-default`
      }
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarBrand className="pt-0">
          <img
            className="navbar-brand-img"
            src={require("assets/img/brand/logo.png")}
            alt="LOGO"
            style={{ width: "100px" }}
          />
        </NavbarBrand>

        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img src={props.image} alt=".." />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile">
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/index">
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/index">
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo">
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen} toggle={toggleCollapse}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="7">
                <button className="navbar-toggler" onClick={closeCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Heading */}
          <h6 className="navbar-heading text-muted">Features</h6>

          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            {props.darkModeFlag === "false"
              ? createLinks(routes, "text-default")
              : createLinks(routes, "text-white")}
          </Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <h6 className="navbar-heading text-muted">More</h6>

          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            {props.darkModeFlag === "false"
              ? createLinks(more_routes, "text-default")
              : createLinks(more_routes, "text-white")}
          </Nav>
          <hr className="my-3" />
          <h6 className="navbar-heading text-muted">Customisation</h6>

          <Row>
            <Col xl="3">
              <label className="custom-toggle">
                {props.darkModeFlag === "false" ? (
                  <input type="checkbox" onChange={props.darkMode} />
                ) : (
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={props.darkMode}
                  />
                )}
                <span className="custom-toggle-slider w-100 rounded-circle mr-3" />
              </label>
            </Col>
            <Col xl="9">
              <h4
                className={
                  props.darkModeFlag === "false" ? "text-default" : "text-white"
                }
              >
                Dark Mode
              </h4>
            </Col>
          </Row>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
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
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
