import React from "react";

import { View, Image, Text } from "react-native";

interface IResult {
   title: string;
   subTitle: string;
   status?: number;
}

const Result = ({ title, subTitle, status }: IResult) => {
   const notFoundImg = require("../../assets/not-found.png");
   const errorImg = require("../../assets/error.png");

   return (
      <View className="flex flex-1 items-center">
         <Image source={status === 500 ? errorImg : notFoundImg} />
         <Text className="text-lg mt-2">{title}</Text>
         <Text className="text-gray-400 text-center">{subTitle}</Text>
      </View>
   );
};

export default Result;
