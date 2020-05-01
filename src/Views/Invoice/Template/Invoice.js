import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";

import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import Details from "./Details";

import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankyouMsg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  col: {
    width: "5pt",
  },
});

const Invoice = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle className="lol" style={styles.lol} title="Invoice" />
        <Details invoice={props.invoice} />
        <BillTo invoice={props.invoice} />
        <InvoiceItemsTable invoice={props.invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

export default Invoice;
