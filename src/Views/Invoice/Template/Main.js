import React, { Component, Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Invoice";
// import invoice from "./test/invoice";

// import logo from './logo.svg';
import "../App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.invoice = props.invoice;
    this.setWidth = props.setWidth;
    console.log(this.invoice);
  }

  render() {
    return (
      <Fragment>
        <PDFViewer className="app">
          <Invoice invoice={this.invoice} setWidth={this.setWidth} />
        </PDFViewer>
      </Fragment>
    );
  }
}

export default Main;
