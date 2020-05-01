import React from "react";
/* eslint-disable */

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/MoonLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: grid;
  margin: auto auto;
  border-color: red;
`;

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div
        className="sweet-loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader
          size={100}
          css={override}
          color={"#4F4F4F"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
