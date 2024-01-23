import React from "react";

import { IResultCalculator } from "../../../helpers";

import { View, Text, StyleSheet } from "react-native";

interface IRow {
   title: string;
   value: number;
   afterValue?: string;
}

const Row = ({ title, value, afterValue = "₽" }: IRow): JSX.Element => (
   <View className="flex flex-row justify-between">
      <Text className="mb-2 text-white">{title}</Text>
      <Text className="font-medium text-white">
         {value} {afterValue}
      </Text>
   </View>
);

const Rows = ({ rows }: { rows: IRow[] }): JSX.Element => {
   return (
      <>
         {rows.map(({ title, value, afterValue }, index) => (
            <Row key={index} title={title} value={value} afterValue={afterValue} />
         ))}
      </>
   );
};

const Result = (args: IResultCalculator) => {
   const rowsFirst: IRow[] = [
      {
         title: "Комиссия маркетплейса",
         value: args.wbComission,
      },
      {
         title: "Хранение в месяц",
         value: args.storagePerMonth,
      },
      {
         title: "Стоимость логистики",
         value: args.logisticCost,
      },
      {
         title: "Налоги",
         value: args.taxes,
      },
      {
         title: "Маржинальность",
         value: args.marginalProfit,
         afterValue: "%",
      },
   ];

   const rowsSecond: IRow[] = [
      {
         title: "Затраты",
         value: args.expenses,
      },
      {
         title: "Прибыль",
         value: args.profit,
      },
   ];

   const rowsThird: IRow[] = [
      {
         title: "Затраты",
         value: args.expensesTotal,
      },
      {
         title: "Прибыль",
         value: args.profitTotal,
      },
   ];

   return (
      <View className="w-full">
         <Text className="text-base mb-3 font-medium uppercase">Результаты расчета</Text>
         <View className="pt-3 pb-1 px-4 rounded-xl w-full bg-gray-900">
            <Rows rows={rowsFirst} />
         </View>
         <Text className="text-base my-3 font-medium uppercase">На единицу товара</Text>
         <View
            className="pt-3 pb-1  px-4 rounded-xl text-white tw-w-full"
            style={styles.oneProduct}>
            <Rows rows={rowsSecond} />
         </View>
         <Text className="text-base my-3 font-medium uppercase">Итого</Text>
         <View
            className="pt-3 pb-1  px-4 rounded-xl bg-blue-color text-white tw-w-full"
            style={styles.result}>
            <Rows rows={rowsThird} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   oneProduct: {
      backgroundColor: "#e24675",
   },
   result: {
      backgroundColor: "#1677ff",
   },
});

export default Result;
