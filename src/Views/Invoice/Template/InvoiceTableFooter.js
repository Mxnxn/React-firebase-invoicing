import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archia",
  src: require("../font/ArchiaSB.ttf"),
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#8f8f8f",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 9,
    fontWeight: "bold",
    marginRight: 18,
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: "#8f8f8f",
    borderRightWidth: 0.4,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    fontFamily: "Archia",
  },
  rowx: {
    marginRight: 18,
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontSize: 8,
    fontWeight: "bold",
  },
  descriptionx: {
    width: "85%",
    textAlign: "right",
    paddingRight: 8,
    fontFamily: "Archia",
  },
  totalx: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    fontFamily: "Archia",
  },
});

const InvoiceTableFooter = ({ items, overall }) => {
  const total = items
    .map((item) => item.qty * item.rate)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let statex = { cgst: "", sgst: "", total: "" };
  for (let entry of items) {
    statex["cgst"] =
      Number(statex["cgst"]) + Number(entry["amount"] * (entry["cgst"] / 100));
    statex["sgst"] =
      Number(statex["sgst"]) + Number(entry["amount"] * (entry["sgst"] / 100));
    statex["total"] = Number(statex["total"]) + Number(entry["total"]);
  }
  const totalx = total + statex.cgst + statex.sgst;
  const cgst = items[0].cgst;
  return (
    <View>
      <View style={styles.rowx}>
        <Text style={styles.descriptionx}>SUBTOTAL</Text>
        <Text style={styles.totalx}>{Number.parseFloat(total).toFixed(2)}</Text>
      </View>
      <View style={styles.rowx}>
        <Text style={styles.descriptionx}>CGST @{cgst}%</Text>
        <Text style={styles.totalx}>
          {Number.parseFloat(statex.cgst).toFixed(2)}
        </Text>
      </View>
      <View style={styles.rowx}>
        <Text style={styles.descriptionx}>SGST @{cgst}%</Text>
        <Text style={styles.totalx}>
          {Number.parseFloat(statex.sgst).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.descriptionx}>TOTAL</Text>
        <Text style={styles.total}>{Number.parseFloat(totalx).toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default InvoiceTableFooter;
