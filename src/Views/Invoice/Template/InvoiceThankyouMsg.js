import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Archive",
  src: require("../font/Archive-Regular.ttf"),
});

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    fontFamily: "Archive",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceThankYouMsg = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>Thank you for your business</Text>
  </View>
);

export default InvoiceThankYouMsg;
