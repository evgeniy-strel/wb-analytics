import React, { useEffect, useRef, useState } from "react";

import { View, SafeAreaView, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { Table as TableComponent, Row } from "react-native-table-component";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";

import { LoadingSpinner, Dropdown, Result, Wrapper } from "..";
import {
   setActiveCategory,
   setCategoriesFull,
   setNeedScrollToTop,
   setProductsFull,
   setSubCategories,
} from "../../store/slices/screenSlice";
import {
   getActiveCategory,
   getCategories,
   getCategoriesFull,
   getProducts,
   getSubCategories,
} from "../../store/selectors";
import axios from "axios";

interface IHeaderColumn {
   title: string;
   width: number;
}

interface ITableProps {
   headerColumns: IHeaderColumn[]; // колонки шапки таблицы
   source: () => Promise<any[]>; // источник данных
   withoutSubCategories?: boolean;
}

const TableProducts = ({ headerColumns, source, withoutSubCategories }: ITableProps) => {
   const columnsWidth = headerColumns.map((col) => col.width);

   const dispatch = useDispatch();

   const [data, setData] = useState<any[]>([]);

   const category = useSelector(getActiveCategory);
   const categoriesFull = useSelector(getCategoriesFull);
   const products = useSelector(getProducts);

   const items = categoriesFull.map((cat: any) => ({ value: cat.name, label: cat.name }));

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [page, setPage] = useState<number>(1);

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   const showErrorSource = () => {
      Alert.alert(
         "Что-то пошло не так",
         "Не удалось получить данные, попробуйте повторить попытку",
      );
   };

   const onChangeCategory = ({ value }) => {
      dispatch(setActiveCategory(value));
   };

   const onClickPrevPage = () => {
      setPage((page) => page - 1);
      dispatch(setNeedScrollToTop());
   };

   const onClickNextPage = () => {
      setPage((page) => page + 1);
      dispatch(setNeedScrollToTop());
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
      axios
         .get(`${backURL}/calc/sub_cat_list?category=${category}`)
         .then(({ data }: any) => dispatch(setSubCategories(data)))
         .catch(() => alert("Ошибка БД"))
         .finally(() => setIsLoading(false));
   }, [category]);

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
   }, [category, source]);

   const Table = () =>
      data.length ? (
         <ScrollView style={{ flex: 1 }}>
            <View>
               <ScrollView horizontal={true} className="my-4">
                  <View>
                     <TableComponent borderStyle={styles.headerBorder}>
                        <Row
                           data={headerColumns.map((col) => col.title)}
                           widthArr={headerColumns.map((col) => col.width)}
                           style={styles.header}
                           textStyle={styles.text}
                        />
                     </TableComponent>
                     <TableComponent borderStyle={{ borderWidth: 1, borderColor: "#f0f0f0" }}>
                        {data.map((rowData, index) => (
                           <Row
                              key={index}
                              data={rowData}
                              widthArr={columnsWidth}
                              style={styles.row}
                              textStyle={styles.text}
                           />
                        ))}
                     </TableComponent>
                  </View>
               </ScrollView>
               <View className="flex flex-1 flex-row items-center justify-between">
                  <Button size="small" onPress={onClickPrevPage} disabled={page === 1}>
                     <IonIcons name="chevron-back-outline" />
                     <Text>Предыдущая</Text>
                  </Button>
                  <Button size="small" appearance="outline" status="primary">
                     {page}
                  </Button>
                  <Button size="small" onPress={onClickNextPage} disabled={page === 5}>
                     <Text>Следующая</Text>
                     <IonIcons name="chevron-forward-outline" />
                  </Button>
               </View>
            </View>
         </ScrollView>
      ) : (
         <View className="mt-8">
            <Result
               title="Таблица не построена"
               subTitle="Для получения данных выберите интересующую категорию и подкатегорию"
            />
         </View>
      );

   return (
      <>
         <View>
            <View className="mb-3">
               <Dropdown
                  items={items}
                  value={category}
                  onChange={onChangeCategory}
                  placeholder="Выбрать категорию"
               />
            </View>
         </View>
         {isLoading ? (
            <View className="mt-6">
               <LoadingSpinner />
            </View>
         ) : (
            <Table />
         )}
      </>
   );
};

const styles = StyleSheet.create({
   header: { backgroundColor: "#fafafa", paddingHorizontal: 6 },
   headerBorder: { borderWidth: 1, borderColor: "#f0f0f0" },
   text: { textAlign: "center", paddingHorizontal: 6, paddingVertical: 5 },
   dataWrapper: { marginTop: -1, borderWidth: 0 },
   row: {
      backgroundColor: "#fafafa",
      borderWidth: 0,
      overflow: "hidden",
      paddingHorizontal: 6,
   },
});

export default TableProducts;
