import React from "react";

import { Input } from "@ui-kitten/components";
import { StyleSheet, Text, View } from "react-native";

interface IInputNumber {
   value: number;
   onChange: (value: any) => void;
   placeholder: string;
   caption: string;
   disabled?: boolean;
   addonAfter: string;
}

const regex = /\d+/g;

const InputNumber = ({
   value,
   onChange,
   placeholder,
   caption,
   disabled,
   addonAfter,
}: IInputNumber) => {
   const onChangeValue = (value: string) => {
      // валидация на только цифры
      const number = value?.match(regex)?.join("");
      if (number) {
         onChange(+number);
      } else {
         onChange(null);
      }
   };

   return (
      <View>
         <Text className="text-sm mb-2 font-medium">{caption}</Text>
         <Input
            placeholder={placeholder}
            value={value?.toString() || ""}
            onChangeText={onChangeValue}
            size="large"
            style={styles.input}
            accessoryRight={<Text>{addonAfter}</Text>}
            disabled={disabled}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      backgroundColor: "white",
      borderRadius: 10,
   },
});

export default InputNumber;
