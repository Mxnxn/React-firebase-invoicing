import React from "react";
import { Text, Image, View, StyleSheet, Font } from "@react-pdf/renderer";
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

const Details = ({ invoice }) => {
  const styles = StyleSheet.create({
    headerContainer: {
      fontFamily: "Archia",
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
    },
    billTo: {
      fontFamily: "Archive",
      paddingBottom: 3,
    },
    logo: {
      width: "100px",
      marginLeft: "auto",
    },
    bold: {
      fontSize: 13,
      fontFamily: "Rflex",
      fontWeight: "bold",
    },
    col1: {
      width: "80%",
    },
    colorx: {
      color: "#7f7f7f",
    },
  });
  return (
    <View style={styles.headerContainer}>
      <View style={styles.col1}>
        <Text style={styles.bold}>{invoice.owner}</Text>
        <Text style={styles.colorx}>{invoice.ownerAddress}</Text>
        <Text style={styles.colorx}>{invoice.ownerPhone}</Text>
        <Text style={styles.colorx}>{invoice.ownerEmail}</Text>
        <Text style={styles.colorx}>{invoice.ownerGST}</Text>
      </View>
      <View>
        <Image style={styles.logo} src={{ uri: invoice.url }} />
      </View>
    </View>
  );
};

export default Details;
