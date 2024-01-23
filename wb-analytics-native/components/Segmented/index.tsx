import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface IOption {
   caption: string; // заголовок
   value: string | number; // значение
   icon?: JSX.Element; // иконка
}

interface ISegmented {
   options: IOption[];
   selectedValue: IOption["value"];
   onChange: (value: IOption["value"]) => void;
}

const Segmented = ({ options, selectedValue, onChange }: ISegmented) => {
   return (
      <View className="bg-gray-100 rounded-lg px-1 py-1 cursor-pointer">
         {options.map(({ caption, value, icon }) => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => onChange(value)}>
               <View
                  className={`w-full flex-row items-center justify-center py-2 px-2 text-center rounded-lg ${
                     selectedValue === value
                        ? "bg-white"
                        : "text-gray-800 hover:bg-gray-300 hover:text-gray-900"
                  } `}
                  key={value}>
                  <View className="mr-2">{icon}</View>
                  <Text className="text-sm">{caption}</Text>
               </View>
            </TouchableOpacity>
         ))}
      </View>
   );
};

export default Segmented;
