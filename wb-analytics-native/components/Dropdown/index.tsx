import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown as DropdownElement } from "react-native-element-dropdown";

const Dropdown = ({ items, placeholder, value, onChange, disable, caption }: any) => {
   const renderItem = (item) => {
      return (
         // <View>
         //    <Text>{item.label}</Text>
         // </View>
         <View style={styles.item}>
            <Text>{item.label}</Text>
         </View>
      );
   };

   return (
      <View>
         {caption && <Text className="text-sm mb-2 font-medium">{caption}</Text>}
         {/* <DropdownElement
            data={items}
            search
            disable={disable}
            maxHeight={360}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Найти..."
            value={value}
            onChange={onChange}
            renderItem={renderItem}
         /> */}
         <DropdownElement
            style={disable ? { ...styles.dropdown, ...styles.dropdownDisabled } : styles.dropdown}
            placeholderStyle={{ ...styles.placeholderStyle, ...styles.fontSize }}
            selectedTextStyle={styles.fontSize}
            inputSearchStyle={{ ...styles.inputSearchStyle, ...styles.fontSize }}
            containerStyle={styles.containerStyle}
            data={items}
            search
            disable={disable}
            maxHeight={360}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Найти..."
            value={value}
            onChange={onChange}
            renderItem={renderItem}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   dropdown: {
      backgroundColor: "white",
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderColor: "#e2e2e2",
      borderWidth: 1,
   },
   dropdownDisabled: {
      backgroundColor: "#efefef",
      color: "#a9a9a9",
   },
   icon: {
      marginRight: 5,
   },
   item: {
      paddingHorizontal: 15,
      paddingVertical: 11,
      flexDirection: "row",
   },
   fontSize: {
      fontSize: 14,
   },
   inputSearchStyle: {
      paddingHorizontal: 6,
      borderRadius: 5,
   },
   placeholderStyle: {
      color: "#b1b1b1",
   },
   containerStyle: {
      borderRadius: 10,
   },
});

export default Dropdown;
