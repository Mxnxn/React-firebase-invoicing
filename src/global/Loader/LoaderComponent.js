import React from "react";
/* eslint-disable */

import ClipLoader from "react-spinners/ScaleLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <span
        className="sweet-loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5vh",
        }}
      >
        <ClipLoader
          height={25}
          width={3}
          radius={3}
          margin={2}
          // css={override}
          color={"#aeaeae"}
          loading={this.state.loading}
        />
      </span>
    );
  }
}
