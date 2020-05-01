import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archive",
  src: require("../font/Archive-Regular.ttf"),
});
Font.register({
  family: "Rflex",
  src: require("../font/R-FLEX-BOLD.otf"),
});
Font.register({
  family: "Archia",
  src: require("../font/ArchiaRt.ttf"),
});

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    borderTopColor: "#7f7f7f",
    borderTopWidth: 1,
    paddingTop: 6,
  },
  text: {
    fontFamily: "Archia",
    color: "#7f7f7f",
    // fontWeight: "bold",
  },
  col: {
    width: "80%",
  },
  colx: {
    display: "flex",
    flexDirection: "column",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.row}>
    <View style={styles.col}>
      <Text style={{ fontFamily: "Rflex" }}>Invoice To:</Text>
      <Text style={styles.text}>{invoice.company}</Text>
      <Text style={styles.text}>{invoice.address}</Text>
      <Text style={styles.text}>{invoice.phone}</Text>
      <Text style={styles.text}>GST Number: {invoice.GST}</Text>
    </View>
    <View style={styles.colx}>
      <View>
        <Text style={{ fontFamily: "Rflex" }}>
          Invoice No:<Text style={styles.text}> {invoice.invoice_no}</Text>
        </Text>
      </View>
      <View>
        <Text style={{ fontFamily: "Rflex" }}>
          Date:<Text style={styles.text}> {invoice.date} </Text>
        </Text>
      </View>
    </View>
  </View>
);

export default BillTo;
