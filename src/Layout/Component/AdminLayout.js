import React, { Component } from "react";
/* */
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Footer from "../../Common/Footers/AdminFooter";
import { Container } from "reactstrap";
import AdminNavbar from "../../Common/Navbars/AdminNavbar";
import routes from "../../routes";
import more_routes from "../../moreroutes";
import Index from "../../Views/Index";

import UserProfileIndex from "../../Views/UserProfile/component/UserProfileIndex";
import UserProfileDetail from "../../Views/UserProfile/component/UserProfileDetail";
import { userBackend } from "Views/UserProfile/user_backend";
import PreInvoiceIndex from "Views/Invoice/Component/PreInvoiceIndex";

export default class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.storage = window.localStorage;
    this.state = {
      uid: props.uid,
      firebaseInitialized: false,
      imageUrl: "",
      darkMode: this.storage.getItem("mode")
        ? window.localStorage.getItem("mode")
        : "false",

      darkModeColor: {
        sidebarColor: "bg-white",
        sidebarDarkColor: "bg-default",
        tableColor: "bg",
        textColor: "text-white",
        tableDarkColor: "bg-default",
        textDarkColor: "text-default",
      },
    };

    this.user = "";

    userBackend
      .getUserDetail(this.state.uid)
      .then((data) => {
        this.user = data;
        this.setState({ imageUrl: data.url, userEmail: data.email });
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/error");
      });

    this.darkModeToggle = this.darkModeToggle.bind(this);
  }

  darkModeToggle() {
    if (this.state.darkMode === "false") {
      this.storage.setItem("mode", "true");
      this.setState({ darkMode: "true" });
    } else {
      this.storage.setItem("mode", "false");
      this.setState({ darkMode: "false" });
    }
  }

  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            key={key}
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                {...{ uid: this.state.uid, darkModeFlag: this.state.darkMode }}
              />
            )}
          />
        );
      } else {
        return null;
      }
    });
  }

  getBrandText = (path, route, extraRoutes) => {
    for (let i = 0; i < routes.length; i++) {
      if (path.indexOf(route[i].layout + route[i].path) !== -1)
        return routes[i].name;
    }
    for (let i = 0; i < extraRoutes.length; i++) {
      if (path.indexOf(extraRoutes[i].layout + extraRoutes[i].path) !== -1) {
        return extraRoutes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          darkModeColor={this.state.darkModeColor}
          darkModeFlag={this.state.darkMode}
          darkMode={this.darkModeToggle}
          routes={routes}
          image={this.state.imageUrl}
          email={this.props.email}
          more_routes={more_routes}
        />
        <div
          className={
            this.state.darkMode === "true"
              ? "main-content bg-gradient-primary"
              : "main-content"
          }
          ref="mainContent"
        >
          <AdminNavbar
            {...this.props}
            email={this.props.mail}
            uid={this.state.uid}
            url={this.state.imageUrl}
            brandText={this.getBrandText(
              this.props.location.pathname,
              routes,
              more_routes
            )}
          />

          <Switch>
            <Route
              path="/admin/index"
              render={(props) => (
                <Index
                  {...props}
                  {...{
                    uid: this.state.uid,
                    darkModeFlag: this.state.darkMode,
                  }}
                />
              )}
            />
            <Route
              path="/admin/saved/invoice"
              render={(props) => (
                <PreInvoiceIndex
                  {...props}
                  {...{
                    uid: this.state.uid,
                    darkModeFlag: this.state.darkMode,
                    user: this.user,
                  }}
                />
              )}
            />
            {/* <Route
                path="/admin/sheet"
                render={props => (
                  <Client {...props} {...{ uid: this.state.uid }} />
                )}
              /> */}
            <Route
              exact
              path="/admin/userprofile"
              render={(props) => (
                <UserProfileIndex {...props} {...{ uid: this.state.uid }} />
              )}
            />
            <Route
              exact
              path="/admin/userprofile/add"
              render={(props) => (
                <UserProfileDetail {...props} {...{ uid: this.state.uid }} />
              )}
            />

            {this.darkMode === "false"
              ? this.getRoutes(more_routes, this.state.darkMode)
              : this.getRoutes(more_routes, "lol")}
            <Redirect from="/" to="/admin/index" />
          </Switch>
          <Container
            className={
              this.state.darkMode === "true" ? "bg-gradient-primary" : ""
            }
            fluid
          >
            <Footer darkModeFlag={this.state.darkMode} />
          </Container>
        </div>
      </>
    );
  }
}
