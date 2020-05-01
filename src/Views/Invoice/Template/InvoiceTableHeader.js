import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archia",
  src: require("../font/ArchiaSB.ttf"),
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopColor: "#5f5f5f",
    borderBottomColor: "#5f5f5f",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    fontSize: "7pt",
    alignItems: "center",
    height: 24,
    // fontStyle: "bold",
    flexGrow: 1,
    fontFamily: "Archia",
  },
  description: {
    width: "40%",
    paddingLeft: 4,
  },
  srno: {
    width: "5%",
  },
  date: {
    width: "10%",
  },
  qty: {
    width: "10%",
    paddingLeft: 10,
  },
  rate: {
    textAlign: "center",
    width: "15%",
  },
  amount: {
    textAlign: "center",
    width: "25%",
    paddingLeft: "5%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.date}>DATE</Text>
    <Text style={styles.description}>DESCRIPTION</Text>
    <Text style={styles.qty}>QUANTITY</Text>
    <Text style={styles.rate}>RATE</Text>
    <Text style={styles.amount}>AMOUNT</Text>
  </View>
);

export default InvoiceTableHeader;
