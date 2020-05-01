import React, { Fragment } from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archia",
  src: require("../font/ArchiaSB.ttf"),
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#8f8f8f",
    borderBottomWidth: 0.3,
    alignItems: "center",
    height: 24,
    fontWeight: "bold",
    fontFamily: "Archia",
    fontSize: "9pt",
  },
  description: {
    width: "40%",
    textAlign: "left",
    borderRightColor: "#8f8f8f",
    paddingLeft: 5,
  },
  srno: {
    width: "5%",
    borderRightColor: "#8f8f8f",
    textAlign: "center",
    paddingRight: 8,
  },
  date: {
    width: "10%",
    borderRightColor: "#8f8f8f",
    textAlign: "left",
  },
  qty: {
    width: "10%",
    borderRightColor: "#8f8f8f",
    textAlign: "center",
  },
  rate: {
    width: "15%",
    borderRightColor: "#5f5f5f",
    textAlign: "center",
  },
  amount: {
    paddingLeft: "5%",
    width: "25%",
    textAlign: "center",
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item, index) => (
    <View key={index} style={styles.row}>
      <Text style={styles.date}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.product} {item.description}
      </Text>
      <Text style={styles.qty}>{item.qty}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
