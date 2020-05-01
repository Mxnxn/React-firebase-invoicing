import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archive",
  src: require("../font/Archive-Regular.ttf"),
});

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontFamily: "Archive",
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
