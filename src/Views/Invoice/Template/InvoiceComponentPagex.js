import React, { Component } from "react";
// import ListItem from "./ListItem";
import Main from "./Main";
import Loader from "react-spinners/ScaleLoader";
/* Stateless component that takes props and displays the sheet page
 * props:
 * `sheet`
 * `entries`
 * `total`
 * `downloadHandler`
 * `deleteHandler`
 */
class InvoiceComponentPage extends Component {
  constructor(props) {
    super();
    this.sheet = props.sheet;
    this.entries = props.entries;
    this.overall = props.overall;
    this.owner = props.owner;
    this.date = props.date;
    this.fetching = false;

    this.state = {
      sr_no: "",
      date: this.date,
      id: this.sheet.id,
      invoice_no: props.ino,
      balance: this.overall.total,
      owner: this.owner.firm,
      ownerAddress: this.owner.address,
      ownerPhone: this.owner.phone,
      ownerEmail: this.owner.email,
      ownerGST: this.owner.gst,
      company: this.sheet.clientName,
      phone: this.sheet.clientNumber,
      address: this.sheet.clientAddress,
      GST: this.sheet.clientGST,
      items: [],
      url: this.owner.url,
    };

    // console.log(this.entries);
    let clone = this.entries;
    clone.forEach((lol, index) => {
      lol.total =
        Number(lol.amount) + Number(lol.amount * Number(lol.cgst / 50));
      this.state.items.push(lol);
    });

    if (this.state.items !== [] && this.state) {
      this.fetching = true;
    }
  }

  render() {
    return this.fetching ? (
      <Main invoice={this.state} className="btn btn-primary glyphicon-edit" />
    ) : (
      <Loader />
    );
  }
}
export default InvoiceComponentPage;
