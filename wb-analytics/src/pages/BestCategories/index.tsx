import React, { useState } from "react";

import type { ColumnsType } from "antd/es/table";

import { Table } from "../../components";
import { IRowBestCategoryTable, convertToRubleFormat, setDelay } from "../../helpers";
import { useSelector } from "react-redux";
import { getActiveSubCategory, getSubCategories } from "../../store/selectors";

const columns: ColumnsType<IRowBestCategoryTable> = [
   {
      title: "Подкатегория",
      dataIndex: "subcategory",
   },
   {
      title: "Средняя цена товаров",
      dataIndex: "average_price",
   },
   {
      title: "Количество продаж в день",
      dataIndex: "sales_per_day",
   },
   {
      title: "Средняя выручка в месяц",
      dataIndex: "revenue_per_month",
   },
].map((column) => ({ ...column, key: column.dataIndex }));

const BestCategories: React.FC = () => {
   const subCategories = useSelector(getSubCategories).map((value: any) => value.sub_category);

   const source = async (): Promise<IRowBestCategoryTable[]> => {
      const data: IRowBestCategoryTable[] = subCategories
         .map((_: any, index: any) => {
            const averagePrice = Math.round(Math.random() * 3000);
            const salesPerDay = Math.round(Math.random() * 400);

            return {
               key: index.toString(),
               subcategory: subCategories[index],
               average_price: averagePrice,
               sales_per_day: salesPerDay,
               revenue_per_month: averagePrice * salesPerDay * 30,
            };
         })

         .map((item: any) => convertToRubleFormat(item, ["average_price", "revenue_per_month"]));

      return data || [];
   };

   return (
      <div>
         <div className="text-3xl font-medium mb-2">Самые выгодные ниши для продаж</div>
         <Table withoutSubCategories={true} columns={columns} source={source} />
      </div>
   );
};

export default BestCategories;
