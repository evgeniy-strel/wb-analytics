import React, { useEffect, useState } from "react";

import { Modal, Table as TableAnt } from "antd";
import type { ColumnsType } from "antd/es/table";

import { SelectForTable } from "..";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
   getCategories,
   getCategoriesFull,
   getCategory,
   getProducts,
   getSubCategories,
} from "../../store/selectors";
import {
   setActiveCategory,
   setActiveSubCategory,
   setCategories,
   setCategoriesFull,
   setProductsFull,
   setSubCategories,
} from "../../store/data/dataSlice";

interface ITableProps {
   columns: ColumnsType<any>; // колонки таблицы
   source: () => Promise<any[]>; // источник данных
   withoutSubCategories?: boolean;
   withProducts?: boolean;
}

// Компонент таблицы с выбором категории и подкатегории

const TableProducts = ({ columns, source, withoutSubCategories, withProducts }: ITableProps) => {
   const [data, setData] = useState<any[]>([]);

   const dispatch = useDispatch();

   const category = useSelector(getCategory);
   const categoriesFull = useSelector(getCategoriesFull);
   const products = useSelector(getProducts);

   const categoriesNames = categoriesFull.map((cat: any) => cat.name);

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [page, setPage] = useState<number>(1);

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   const onChangeCategory = (item: string) => {
      dispatch(setActiveCategory(item));
   };

   const onChangePage = (page: number) => {
      setPage(page);
      window.scrollTo(0, 0);
   };

   const showErrorSource = () => {
      const config = {
         title: "Что-то пошло не так",
         content: <>Не удалось получить данные, попробуйте повторить попытку</>,
      };

      Modal.error(config);
   };

   useEffect(() => {
      setIsLoading(true);
      axios
         .get(`${backURL}/all_categories`)
         .then(({ data }: any) => {
            dispatch(setCategoriesFull(data));
         })
         .catch(() => alert("Ошибка БД"));

      axios
         .get(`${backURL}/sales_with_category`)
         .then(({ data }: any) => {
            dispatch(setProductsFull(data));
         })
         .catch(() => alert("Ошибка БД"))
         .finally(() => setIsLoading(false));
   }, []);

   useEffect(() => {
      if (!category) return;

      setIsLoading(true);
      setPage(1);
      source()
         .then((data) => {
            setData(data);
            console.log(data, "set");
         })
         .catch(() => {
            showErrorSource();
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [category, source]);

   return (
      <>
         <div className="tw-flex tw-flex-wrap my-4 gap-x-8 gap-y-4">
            <SelectForTable
               categories={categoriesNames}
               value={category}
               onChange={onChangeCategory}
               placeholder="Выбрать категорию"
               disabled={isLoading}
            />
         </div>
         <TableAnt
            scroll={{ x: 100 }}
            pagination={{
               defaultPageSize: 20,
               onChange: onChangePage,
               showSizeChanger: false,
               current: page,
            }}
            dataSource={data}
            columns={columns}
            loading={isLoading}
         />
      </>
   );
};

export default TableProducts;
