import React, { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   View,
   Image,
   Text,
   Alert,
   TouchableOpacity,
   Linking,
} from "react-native";

import { Input, Button, ProgressBar } from "@ui-kitten/components";
import { Img, Result, Wrapper } from "../../components";
import { IStats, Stats } from "./Stats";
import { GenerateImgUrl, setDelay } from "../../helpers/functions";
import { Skeleton } from "@rneui/themed";
import axios from "axios";

const AnalyticsProduct = ({ navigation }) => {
   const [product, setProduct] = useState<any>({});
   const [img, setImg] = useState<string>("");

   const [percentRating, setPercentRating] = useState<number>(90);
   const [isDataSuccess, setIsDataSuccess] = useState<boolean>();

   const [isSearched, setIsSearched] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchValue, setSearchValue] = useState<string>("");

   const onSearch = async () => {
      const isSearchValid = isValidSearch(searchValue);

      if (!isSearchValid) {
         showErrorSearchMessage();
         return;
      }

      setIsLoading(true);
      setIsDataSuccess(undefined);
      setIsSearched(true);

      fetchProduct();
      setSearchValue("");
   };

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   const fetchProduct = () => {
      const articul = getArticul(searchValue);

      const img = new GenerateImgUrl(+articul);
      setImg(img.url());

      axios
         .get(`${backURL}/analitics?articul=${articul}`)
         .then(({ data }: any) => {
            setProduct(data);
         })
         .catch(() => setIsDataSuccess(false))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onChangeSearch = (newValue: string) => {
      setSearchValue(newValue);
   };

   /* метод, проверящий корректность ссылки или артикула */
   const isValidSearch = (value: string): boolean => {
      if (!value) {
         return false;
      }

      // вычисляем ввели url либо артикул

      if (!checkIsURL(value)) {
         return Number(value) > 0;
      }

      const urlMustContains = ["wildberries.ru", "catalog", "detail.aspx"];
      const urlRegex = /^[A-Za-z0-9\/\.:?=]*$/;

      return urlMustContains.every((rule) => value.includes(rule)) && urlRegex.test(value);
   };

   const getArticul = (value: string): string => {
      let articul = value;
      const numberPattern = /\d+/g;

      if (checkIsURL(value)) {
         articul = value.match(numberPattern)?.join("") || "";
      }

      return articul;
   };

   const checkIsURL = (value: string): boolean => {
      return !Number.isInteger(Number(value));
   };

   const showErrorSearchMessage = () => {
      Alert.alert("Неверное значение", "Проверьте корректность ссылки на товар или его артикула");
   };

   const Rating = (
      <View className="flex  flex-row w-full items-center">
         <ProgressBar
            size="large"
            progress={percentRating / 100}
            style={{ width: "100%", flexShrink: 1 }}
         />
         <Text className="text-2xl ml-4 font-medium">{product?.supplier_rating}</Text>
      </View>
   );

   const Seller = <Text className="text-2xl font-medium">{product?.supplier}</Text>;

   const SearchInput = (
      <View className="flex flex-row">
         <Input
            style={styles.input}
            size="large"
            placeholder="Ссылка товара на WB"
            value={searchValue}
            onChangeText={onChangeSearch}
         />
         {/* <Button onPress={onSearch}> */}
         <Button style={styles.button} onPress={onSearch}>
            Анализ
         </Button>
      </View>
   );

   const dailySales = Math.round(
      Math.max(
         (product?.feedbacks * product?.sale_price_u) / 100 / 150,
         product.sale_price_u / 100,
      ),
   );

   const statsData: IStats[] = [
      {
         caption: "Выручка за день",
         iconName: "wallet",
         value: dailySales,
         afterValue: "₽",
         percent: 13,
      },
      {
         caption: "Выручка за неделю",
         iconName: "wallet",
         value: Math.round(dailySales * 7 - dailySales / 4.4),
         afterValue: "₽",
         percent: 13,
      },
      {
         caption: "Выручка за все время",
         iconName: "wallet",
         value: Math.round(((product?.feedbacks * product?.sale_price_u) / 100) * 2.5),
         afterValue: "₽",
      },
      {
         caption: "Рейтинг товара",
         iconName: "star",
         customContent: Rating,
      },
      {
         caption: "Количество отзывов",
         iconName: "chatbubble-ellipses",
         value: Number(product?.feedbacks),
      },
      {
         caption: "Продавец",
         iconName: "basket",
         customContent: Seller,
      },
   ];

   if (!isSearched) {
      return (
         <Wrapper>
            <View className="mb-8">{SearchInput}</View>
            <Result
               title="Статистика не построена"
               subTitle="Для получения статистики вставьте ссылку товара или его артикул"
            />
         </Wrapper>
      );
   }

   if (isDataSuccess === false) {
      return (
         <Wrapper>
            <View className="mb-8">{SearchInput}</View>
            <Result
               status={500}
               title="Ничего не найдено"
               subTitle="Вы ввели неверную ссылку/артикул или мы пока не собрали статистику по этому товару"
            />
         </Wrapper>
      );
   }

   const Title = ({ message }: { message: string }): JSX.Element => {
      return (
         <View className="mb-1">
            {isLoading ? (
               <Skeleton animation="pulse" width={700} height={50} />
            ) : (
               <Text className="text-2xl font-medium">{message}</Text>
            )}
         </View>
      );
   };

   const Article = ({ value, href }: { value: number; href: string }): JSX.Element => {
      return (
         <View className="flex flex-row items-center gap-3 font-normal mb-3">
            {isLoading ? (
               <Skeleton animation="pulse" width={140} height={40} />
            ) : (
               <>
                  <Text className="text-sm">Арт: {product.wb_id}</Text>
                  <View className="tw-flex-shrink-0">
                     <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(href)}>
                        {/* <Image source={require("../../assets/wb-icon.jpg")} /> */}
                        <Image source={require("../../assets/wb-icon.jpg")} style={styles.img} />
                     </TouchableOpacity>
                  </View>
               </>
            )}
         </View>
      );
   };

   return (
      <Wrapper>
         <View className="mb-3">{SearchInput}</View>
         <Title message={product.name} />
         <Article value={product.wb_id} href={product.url} />
         <View>
            {statsData.map((stats, index) => (
               <View className="mb-3">
                  <Stats key={index} {...stats} isLoading={isLoading} />
               </View>
            ))}
         </View>
         <Img href={product.url} src={img} isLoading={isLoading} />
      </Wrapper>
   );
};

const styles = StyleSheet.create({
   input: {
      flex: 1,
      backgroundColor: "white",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
   },
   button: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
   },
   img: {
      width: 32,
      height: 32,
      borderRadius: 5,
   },
   mainColor: {
      color: "#1677ff",
   },
});

export default AnalyticsProduct;
