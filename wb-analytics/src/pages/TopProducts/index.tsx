import React from "react";

import type { ColumnsType } from "antd/es/table";

import { IRowBestProductTable, convertToRubleFormat, setDelay } from "../../helpers";
import { useSelector } from "react-redux";
import { getActiveSubCategory, getCategory, getProducts } from "../../store/selectors";
import TableProducts from "../../components/Table/TableProducts";

const TopProducts: React.FC = () => {
   const category = useSelector(getCategory);
   const products = useSelector(getProducts);

   const columns: ColumnsType<IRowBestProductTable> = [
      { title: "Название", key: "title" },
      { title: "Категория", key: "category" },
      { title: "Артикул товара", key: "articul" },
      { title: "Цена", key: "price" },
      { title: "Продажи в день", key: "sales_per_day" },
      // { title: "Средняя выручка в день", key: "revenue_per_day" },
   ].map((item) => ({ ...item, dataIndex: item.key }));

   const source = async (): Promise<IRowBestProductTable[]> => {
      if (!category) return [];

      await setDelay(400);

      const data = products
         .map((product: any) => {
            const salesPerDay = Math.round(product.sells / 20);

            return {
               key: product.articul,
               category: category,
               title: product.name,
               price: product.cost / 100,
               articul: product.articul,
               sales_per_day: salesPerDay,
            };
         })
         .map((item: any) => convertToRubleFormat(item, ["price", "revenue_per_day"]));

      data.sort((x: any) => x.sales_per_day);

      return data;
   };

   return (
      <div>
         <div className="text-3xl font-medium mb-2">Самые продаваемые товары сейчас</div>
         <TableProducts columns={columns} source={source} withProducts={true} />
      </div>
   );
};

export default TopProducts;
