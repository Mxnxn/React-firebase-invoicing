import React from "react";
import ClientComponents from "./ClientComponents";
import Footer from "Common/Footers/AdminFooter";
import { Container } from "reactstrap";
import { userBackend } from "Views/UserProfile/user_backend";
import Loader from "global/Loader/Loader";
export default class PreClientComponents extends React.Component {
  constructor(props) {
    super();
    this.id = props.match.params.id;
    this.uid = props.uid;
    this.props = props;
    this.user = "";
    this.state = {
      user: "",
      loading: false,
    };
  }

  componentDidMount() {
    if (this.uid) {
      userBackend.getUserDetail(this.uid).then((data) => {
        if (data) {
          this.setState({ user: data, loading: true });
        }
      });
    }
  }

  render() {
    return this.state.loading ? (
      <>
        {/* <Sidebar clientid={this.id} /> */}
        {/* <div className="main-content" ref="mainContent"> */}
        <ClientComponents
          darkModeFlag={this.props.darkModeFlag}
          uid={this.uid}
          user={this.state.user}
          id={this.id}
        />
        <Container
          className={
            this.props.darkModeFlag === "false" ? "" : "bg-gradient-primary"
          }
          fluid
        >
          <Footer
            darkModeFlag={
              this.props.darkModeFlag === "false" ? "false" : "true"
            }
          />
        </Container>
        {/* </div> */}
      </>
    ) : (
      <Loader />
    );
  }
}
