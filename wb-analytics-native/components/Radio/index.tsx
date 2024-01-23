import React from "react";

import { TStorageScheme } from "../../helpers";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

export interface IItem {
   title: TStorageScheme;
   description: string;
}

export interface IProps {
   item: IItem;
   selectedItem: IItem | null;
   onClick: (item: IItem) => void;
}

const Radio = ({ item, selectedItem, onClick }: IProps) => {
   const isActive = selectedItem?.title === item.title;
   console.log(isActive, item.title);

   if (isActive) {
      return (
         <TouchableOpacity activeOpacity={0.7} onPress={() => onClick(item)}>
            <View
               style={{ borderColor: "#1677ff" }}
               className="w-full rounded-md py-3 px-4 border radio">
               <View className="flex flex-row items-center justify-between">
                  <Text className="text-base font-medium">{item.title}</Text>
                  {isActive && <IonIcons style={styles.icon} name="checkmark-circle-outline" />}
               </View>
               <Text className="text-gray-900">{item.description}</Text>
            </View>
         </TouchableOpacity>
      );
   }

   return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onClick(item)}>
         <View className={`w-full rounded-md py-3 px-4 border radio border-gray-300`}>
            <View className="flex flex-row items-center justify-between">
               <Text className="text-base font-medium">{item.title}</Text>
               {isActive && <IonIcons style={styles.icon} name="checkmark-circle-outline" />}
            </View>
            <Text className="text-gray-900">{item.description}</Text>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   icon: {
      fontSize: 20,
      color: "#1677ff",
   },
});

export default Radio;
