import React from "react";

import LiteHeader from "../../Common/Header/LiteHeader";
import { firebase } from "../../FirebaseAuth/Firebase";

export default class Material extends React.Component {
  constructor(props) {
    super(props);
    firebase.isInitialized(user => {
      this.uid = user.uid;
      console.log(this.uid);
    });
  }
  render() {
    return (
      <>
        <LiteHeader />
        <h1>MATERIAL</h1>
      </>
    );
  }
}
