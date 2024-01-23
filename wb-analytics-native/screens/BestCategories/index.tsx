import React, { useCallback, useEffect } from "react";

import { Table, Wrapper } from "../../components";
import { setDelay } from "../../helpers/functions";
import { convertToRubleFormat } from "../../helpers/converters";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { getActiveSubCategory, getSubCategories } from "../../store/selectors";

const BestCategories = ({ navigation }) => {
   const subCategories = useSelector(getSubCategories).map((value: any) => value.sub_category);

   const source = async (): Promise<any[]> => {
      const data = subCategories
         .map((_: any, index: any) => {
            const averagePrice = Math.round(Math.random() * 3000);
            const salesPerDay = Math.round(Math.random() * 400);

            return [
               subCategories[index],
               averagePrice,
               salesPerDay,
               averagePrice * salesPerDay * 30,
            ];
         })
         .map((col: any) => convertToRubleFormat(col, [1, 3]));

      return data;
   };

   const headerColumns = [
      { title: "Подкатегория", width: 220 },
      { title: "Средняя цена товаров", width: 150 },
      { title: "Количество продаж в день", width: 150 },
      { title: "Средняя выручка в месяц", width: 165 },
   ];

   return (
      <Wrapper>
         <Table headerColumns={headerColumns} source={source} withoutSubCategories={true} />
      </Wrapper>
   );
};

export default BestCategories;
