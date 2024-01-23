import React from "react";

import { Table, TableProducts, Wrapper } from "../../components";
import { setDelay } from "../../helpers/functions";
import { convertToRubleFormat } from "../../helpers/converters";
import { getActiveCategory, getProducts } from "../../store/selectors";
import { useSelector } from "react-redux";
// import TableProducts from "../../components/Table";

const TopProducts = ({ navigation }) => {
   const category = useSelector(getActiveCategory);
   const products = useSelector(getProducts);

   const source = async (): Promise<any[]> => {
      const data = products
         .map((product: any) => {
            const salesPerDay = Math.round(product.sells / 20);
            return [category, product.name, product.articul, product.cost / 100, salesPerDay];
         })
         .map((col: any) => convertToRubleFormat(col, [3]));
      return data;
   };

   const headerColumns = [
      { title: "Категория", width: 220 },
      { title: "Название", width: 270 },
      { title: "Артикул товара", width: 150 },
      { title: "Цена", width: 100 },
      { title: "Продажи в день", width: 100 },
   ];

   return (
      <Wrapper>
         <TableProducts headerColumns={headerColumns} source={source} />
      </Wrapper>
   );
};

export default TopProducts;
