import React from "react";
import { SafeAreaView, View } from "react-native";
import { LoaderScreen, Colors } from "react-native-ui-lib";

const LoadingSpinner = () => {
   return (
      // <SafeAreaView className="flex-1 w-full items-center justify-center">
      <LoaderScreen message={"Идет загрузка..."} color={Colors.grey40} />
      // </SafeAreaView>
   );
};

export default LoadingSpinner;
