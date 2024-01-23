import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>WB Analytics</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 14,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
   },
   title: {
      fontSize: 21,
      lineHeight: 28,
      fontWeight: 600,
   },
});

export default Header;
