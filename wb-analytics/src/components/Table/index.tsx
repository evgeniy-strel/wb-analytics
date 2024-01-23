import React, { useEffect, useState } from "react";

import { Modal, Table as TableAnt } from "antd";
import type { ColumnsType } from "antd/es/table";

import { SelectForTable } from "../../components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts, getSubCategories } from "../../store/selectors";
import {
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

const Table = ({ columns, source, withoutSubCategories, withProducts }: ITableProps) => {
   const [data, setData] = useState<any[]>([]);

   const dispatch = useDispatch();

   const [category, setCategory] = useState<string>();
   const [subCategory, setSubcategory] = useState<string | null>();

   const categories = useSelector(getCategories);
   const subCategories = useSelector(getSubCategories);
   const products = useSelector(getProducts);

   console.log(products);

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [page, setPage] = useState<number>(1);

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   useEffect(() => {
      if (!category) return;

      setIsLoading(true);
      axios
         .get(`${backURL}/calc/sub_cat_list?category=${category}`)
         .then(({ data }: any) => dispatch(setSubCategories(data)))
         .catch(() => alert("Ошибка БД"))
         .finally(() => setIsLoading(false));
   }, [category]);

   const onChangeCategory = (item: string) => {
      setCategory(item);
      setSubcategory(null);
   };

   const onChangeSubcategory = (item: string) => {
      setSubcategory(item);

      const value = subCategories.find((x: any) => x.sub_category === item);

      dispatch(setActiveSubCategory(value));
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
      if (!category) return;

      setIsLoading(true);
      setPage(1);
      source()
         .then((data) => {
            setData(data);
         })
         .catch(() => {
            showErrorSource();
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [category, subCategories, source]);

   return (
      <>
         <div className="tw-flex tw-flex-wrap my-4 gap-x-8 gap-y-4">
            <SelectForTable
               categories={categories}
               value={category}
               onChange={onChangeCategory}
               placeholder="Выбрать категорию"
               disabled={isLoading}
            />
            {!withoutSubCategories && (
               <SelectForTable
                  categories={subCategories.map((value: any) => value.sub_category)}
                  value={subCategory}
                  onChange={onChangeSubcategory}
                  placeholder="Выбрать подкатегорию"
                  disabled={!category || isLoading}
               />
            )}
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

export default Table;
