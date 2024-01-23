import React, { useEffect, useState } from "react";

import { Dropdown, IItem, InputNumber, Radio, Segmented, Wrapper } from "./../../components";
import { ICalculator, IResultCalculator } from "../../helpers";
import Calculator from "./Calculator";

import { View, Text, StyleSheet } from "react-native";
import { NumberInput, SegmentedControl } from "react-native-ui-lib";
import { Slider as Slider2 } from "@rneui/themed";
import Slider from "@react-native-community/slider";
import IonIcons from "react-native-vector-icons/Ionicons";
import Result from "./Result";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSubCategories } from "../../store/selectors";
import axios from "axios";
import { setSubCategories } from "../../store/slices/screenSlice";

const radioOptions: Array<IItem> = [
   {
      title: "FBO",
      description: "Хранение товара на складе маркетплейса",
   },
   {
      title: "FBS",
      description: "Хранение товара на складе продавца",
   },
   {
      title: "DBS",
      description: "Хранение товара и доставка силами продавца",
   },
];

export enum Taxes {
   selfEmployed = 6,
   incomeMinusExpenses = 13,
}

const getResult = (calculator: ICalculator): IResultCalculator => {
   return Calculator.calculateProfit(calculator);
};

const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

const CalculatorPage = ({ navigation }) => {
   const [calculator, setCalculator] = useState(Calculator.createObject());
   const [result, setResult] = useState(getResult(calculator));

   const categories = useSelector(getCategories);
   const subCategories = useSelector(getSubCategories);

   const categoriesItems = categories.map((name: any) => ({ value: name, label: name }));
   const subCategoryItems = subCategories.map((cat: any) => ({
      value: cat.sub_category,
      label: cat.sub_category,
   }));

   const dispatch = useDispatch();

   const onChangeCategory = (item: any) => {
      setCalculator({ ...calculator, category: item?.value, subCategory: null });
   };

   const onChangeSubCategory = (item: any) => {
      const value = subCategories.find((x: any) => x.sub_category === item?.value);

      setCalculator({ ...calculator, subCategory: value });
   };

   const onChangeState = (field: any) => {
      return (value: any) => {
         setCalculator({ ...calculator, [field]: value });
      };
   };

   useEffect(() => {
      console.log(calculator.category);

      axios
         .get(`${backURL}/calc/sub_cat_list?category=${calculator.category}`)
         .then(({ data }: any) => {
            dispatch(setSubCategories(data));
         })
         .catch(() => alert("Ошибка БД"));
   }, [calculator.category]);

   useEffect(() => {
      setResult(getResult(calculator));
   }, [calculator]);

   return (
      <Wrapper>
         <View>
            <View className="mb-3">
               <Dropdown
                  items={categoriesItems}
                  caption="Категория"
                  placeholder=""
                  value={calculator.category}
                  onChange={onChangeCategory}
               />
            </View>
            <Dropdown
               disable={!calculator.category}
               items={subCategoryItems}
               value={calculator.subCategory?.sub_category}
               placeholder=""
               caption="Подкатегория"
               onChange={onChangeSubCategory}
            />
            <View className="mt-3">
               <InputNumber
                  value={calculator.priceOnWB}
                  placeholder=""
                  caption="Стоимость товара на WB"
                  addonAfter="₽"
                  onChange={onChangeState("priceOnWB")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.costPrice}
                  placeholder=""
                  caption="Себестоимость"
                  addonAfter="₽"
                  onChange={onChangeState("costPrice")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.countGoods}
                  placeholder=""
                  caption="Количество"
                  addonAfter="шт"
                  onChange={onChangeState("countGoods")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.length}
                  placeholder=""
                  caption="Длина"
                  addonAfter="см"
                  onChange={onChangeState("length")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.width}
                  placeholder=""
                  caption="Ширина"
                  addonAfter="см"
                  onChange={onChangeState("width")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.height}
                  placeholder=""
                  caption="Высота"
                  addonAfter="см"
                  onChange={onChangeState("height")}
               />
            </View>
            <View className="mt-3">
               <InputNumber
                  value={calculator.weight}
                  placeholder=""
                  caption="Вес"
                  addonAfter="кг"
                  onChange={onChangeState("weight")}
               />
            </View>
            <View className="mt-3">
               <Text className="text-sm mb-2 font-medium">
                  Процент выкупа: {calculator.redemptionPercent}
               </Text>
               <Slider2
                  value={calculator.redemptionPercent}
                  maximumValue={100}
                  minimumValue={0}
                  step={1}
                  onValueChange={onChangeState("redemptionPercent")}
                  allowTouchTrack
                  trackStyle={{ height: 4, backgroundColor: "green" }}
                  minimumTrackTintColor="#1677ff"
                  maximumTrackTintColor="#e9e9e9"
                  thumbStyle={styles.sliderThumbStyle}
               />
            </View>
            <View className="mt-3">
               <Text className="text-sm mb-2 font-medium">Налог</Text>
               <Segmented
                  options={[
                     {
                        caption: "Самозанятый - 6%",
                        value: 6,
                        // icon: <IonIcons name="person-outline" />,
                        icon: <IonIcons style={styles.iconSegmented} name="person-outline" />,
                     },
                     {
                        caption: "Доходы минус расходы - 15%",
                        value: 15,
                        // icon: <IonIcons name="git-compare-outline" />,
                        icon: <IonIcons style={styles.iconSegmented} name="git-compare-outline" />,
                     },
                  ]}
                  onChange={onChangeState("tax")}
                  selectedValue={calculator.tax}
               />
            </View>
            <View className="mt-3">
               <Text className="text-sm mb-2 font-medium">Формат хранения</Text>
               {radioOptions.map((item, index) => (
                  <View className={index === radioOptions.length - 1 ? "" : "mb-2"} key={index}>
                     <Radio
                        key={index}
                        item={item}
                        selectedItem={
                           radioOptions.find(
                              (option) => option.title === calculator.storageScheme?.title,
                           ) || null
                        }
                        onClick={onChangeState("storageScheme")}
                     />
                  </View>
               ))}
            </View>
            <View className="mt-3">
               <Result {...result} />
            </View>
         </View>
      </Wrapper>
   );
};

const styles = StyleSheet.create({
   sliderThumbStyle: {
      height: 27,
      width: 27,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 2,
   },
   iconSegmented: {
      fontSize: 16,
   },
});

export default CalculatorPage;
