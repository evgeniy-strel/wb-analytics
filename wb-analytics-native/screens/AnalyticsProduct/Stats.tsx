import React from "react";

import { CountUp } from "use-count-up";
import { StyleSheet, Text, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Skeleton } from "@rneui/themed";

export interface IStats {
   caption: string; // заголовок
   iconName?: any; // название иконки после заголовка
   value?: number; // число-значение под заголвком
   percent?: number; // процент разницы между сегодня и вчера, отображается в нижнем правом углу
   afterValue?: JSX.Element | string; // контент, отображаемый после value
   customContent?: JSX.Element | string; // при необходимости можно отобразить кастомный контент
   isLoading?: boolean; // отображение скелетона в случае загрузки
}

export const Stats = ({
   caption,
   iconName,
   value,
   percent,
   afterValue,
   customContent,
   isLoading,
}: IStats) => {
   const content = customContent || (
      <View className="flex flex-row flex-wrap items-end">
         <View className="flex flex-row">
            {typeof value === "number" ? (
               <Text className="text-2xl font-medium">
                  <CountUp duration={1} end={value} isCounting />
               </Text>
            ) : (
               <Text className="text-2xl font-medium">{value}</Text>
            )}
            <Text className="text-2xl font-medium"> {afterValue}</Text>
         </View>
      </View>
   );

   return (
      <View
         className=" bg-white py-3 px-4 text-base rounded-md flex flex-col justify-center"
         style={styles.shadow}>
         <View className="flex flex-row items-center pb-3">
            <Text className="text-sm flex flex-row items-center mr-2">{caption}</Text>
            {/* <IonIcons name={iconName} /> */}
            <IonIcons style={styles.icon} name={iconName} />
         </View>
         <View className="flex items-baseline gap-2">
            {isLoading ? (
               <Skeleton animation="pulse" width={170} height={40} />
            ) : (
               <View>{content}</View>
            )}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1.5,
   },
   icon: {
      fontSize: 18,
   },
});

{
   /* {percent && (
               <div className="tw-flex ml-auto tw-items-center gap-1 bg-green-200/50 text-green-800  rounded py-0.5 px-2 tw-flex-shrink-0">
                  <ArrowUpOutlined />
                  <div>
                     <CountUp duration={1.5} end={percent} separator=" " /> %
                  </div>
               </div>
            )} */
}

{
   /* {percent && (
            <div className="text-base text-gray-500">
               вчера <CountUp duration={1.5} end={value!} separator=" " /> {afterValue}
            </div>
         )} */
}
