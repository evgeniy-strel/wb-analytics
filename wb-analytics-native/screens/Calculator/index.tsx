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

const categories = [
   "Наконечники рулевой тяги",
   "Элементы облицовки",
   "Замковые устройства для автоприцепов",
   "Головки соединительные",
   "Противотуманные фары",
   "Тросы подсоса",
   "Накладки на ремень безопасности",
   "Усилители тормоза",
   "Бачки автомобильные",
   "Модули управления центральным замком",
   "Рейлинги",
   "Полироли кузова",
   "Ключи автомобильные",
   "Подогреватели предпусковые",
   "Катушки зажигания",
   "Подвески пневматические",
   "Блоки согласования фаркопов",
   "Фильтры автомобильные",
   "Указатели автомобильные",
   "Составные части стойки амортизатора",
   "Тормозные диски автомобильные",
   "Шпиндели автомобильные",
   "Линзы в фары",
   "Накидки магнитные для авто",
   "Составляющие эмульсионной трубки",
   "Чехлы для водной техники",
   "Утеплители радиатора",
   "Сидения автомобильные",
   "Направляющие клапана",
   "Блоки управления",
   "Блоки розжига ксенона",
   "Лебедки для квадроциклов",
   "Лобовые стекла",
   "Ремкомплекты автомобильные",
   "Элементы катушек зажигания",
   "Зеркала дорожные",
   "Фильтры охлаждающей жидкости",
   "Ленты капота снегохода",
   "Стояночные огни",
   "Ремкомплекты для стекол",
   "Конверторы для автомагнитол",
   "Лопаты автомобильные",
   "Накладки защитные автомобильные",
   "Датчики износа тормозных колодок",
   "Силовая защита картера",
   "Регуляторы нагнетаемого воздуха",
   "Антипробуксовочные приспособления",
   "Рамки автомобильные",
];

const items = categories.map((name) => ({ value: name, label: name }));

const getResult = (calculator: ICalculator): IResultCalculator => {
   return Calculator.calculateProfit(calculator);
};

const CalculatorPage = ({ navigation }) => {
   const [calculator, setCalculator] = useState(Calculator.createObject());
   const [result, setResult] = useState(getResult(calculator));

   const onChangeCategory = (item: string) => {
      setCalculator({ ...calculator, category: item, subCategory: null });
   };

   const onChangeState = (field) => {
      return (value: any) => {
         setCalculator({ ...calculator, [field]: value });
      };
   };

   useEffect(() => {
      setResult(getResult(calculator));
   }, [calculator]);

   return (
      <Wrapper>
         <View>
            <View className="mb-3">
               <Dropdown
                  items={items}
                  caption="Категория"
                  placeholder=""
                  value={calculator.category}
                  onChange={onChangeCategory}
               />
            </View>
            <Dropdown
               disable={!calculator.category}
               items={items}
               value={calculator.subCategory}
               placeholder=""
               caption="Подкатегория"
               onChange={onChangeState("subCategory")}
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
