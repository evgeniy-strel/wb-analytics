import React, { useEffect, useState } from "react";
import "./index.scss";

import { Col, InputNumber, Row, Tooltip } from "antd";

import { ArrowPathRoundedSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { UserOutlined } from "@ant-design/icons";

import Result from "./Result";
import { ICalculator, IResultCalculator, TStorageScheme, Taxes } from "../../helpers";
import Calculator from "./Calculator";
import Segmented from "./Segmented";
import Slider from "./Slider";
import { SelectForTable, Radio } from "../../components";
import { IItem } from "../../components/Radio";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSubCategories } from "../../store/selectors";
import { setSubCategories } from "../../store/data/dataSlice";

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

const options = [{ label: "FBO" }, { label: "FBS" }, { label: "DBS" }].map((item) => ({
   ...item,
   value: item.label,
}));

const getResult = (calculator: ICalculator): IResultCalculator => {
   return Calculator.calculateProfit(calculator);
};

const CalculatorPage: React.FC = () => {
   const [calculator, setCalculator] = useState<ICalculator>(Calculator.createObject());
   const [result, setResult] = useState<IResultCalculator>(getResult(calculator));

   const dispatch = useDispatch();

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   const categories = useSelector(getCategories);
   const subCategories = useSelector(getSubCategories);

   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      setIsLoading(true);
      axios
         .get(`${backURL}/calc/sub_cat_list?category=${calculator.category}`)
         .then(({ data }: any) => {
            dispatch(setSubCategories(data));
         })
         .catch(() => alert("Ошибка БД"))
         .finally(() => setIsLoading(false));
   }, [calculator.category]);

   const onChangeCategory = (item: string) => {
      setCalculator({ ...calculator, category: item, subCategory: null });
   };

   const onChangeSubCategory = (item: string) => {
      const value = subCategories.find((x: any) => x.sub_category === item);

      setCalculator({ ...calculator, subCategory: value });
   };

   const onChangeState = (field: keyof ICalculator) => {
      return (value: any) => {
         setCalculator({ ...calculator, [field]: value });
      };
   };

   useEffect(() => {
      setResult(getResult(calculator));
   }, [calculator]);

   return (
      <div className="Calculator pb-1">
         <div className="mb-4 tw-flex tw-justify-between tw-items-center">
            <div className="text-3xl font-medium">Калькулятор прибыли</div>
            <div>
               <Tooltip title="Размер комиссии и стоимость доставки зависит от склада. В калькуляторе учтены базовые тарифы. Не забудьте добавить к цене ~30% при создании карточки товара. Это нужно для участия в скидках и акциях">
                  <InformationCircleIcon className="w-6 h-6" />
               </Tooltip>
            </div>
         </div>
         <Row
            className="Calculator__content"
            gutter={[
               { xs: 8, md: 16, lg: 28, xl: 36 },
               { xs: 12, sm: 12 },
            ]}>
            <Col className="gap-4" xs={24} lg={16} xl={16}>
               <div className="Calculator__row tw-w-full tw-flex">
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Категория</div>
                     <SelectForTable
                        categories={categories}
                        className="tw-w-full"
                        value={calculator.category}
                        onChange={onChangeCategory}
                        disabled={isLoading}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="tw-flex tw-items-center tw-justify-between">
                        <div className="text-base mb-2  font-medium">Подкатегория</div>
                        <Tooltip title="Для каждой подкатегории на WILDBERRIES установлен свой процент налога">
                           <InformationCircleIcon className="w-5 h-5" />
                        </Tooltip>
                     </div>
                     <SelectForTable
                        categories={subCategories.map((item: any) => item.sub_category)}
                        className="tw-w-full"
                        value={calculator.subCategory?.sub_category}
                        onChange={onChangeSubCategory}
                        disabled={!calculator.category || isLoading}
                     />
                  </div>
               </div>
               <div className="Calculator__row tw-w-full tw-flex">
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Стоимость товара на WB</div>
                     <InputNumber
                        className="tw-w-full "
                        min="1"
                        addonAfter="₽"
                        controls={false}
                        size="large"
                        onChange={onChangeState("priceOnWB")}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Себестоимость</div>
                     <InputNumber
                        className="tw-w-full"
                        min="1"
                        addonAfter="₽"
                        controls={false}
                        size="large"
                        onChange={onChangeState("costPrice")}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Количество</div>
                     <InputNumber
                        className="tw-w-full"
                        min={1}
                        addonAfter="шт"
                        controls={false}
                        size="large"
                        defaultValue={1}
                        onChange={onChangeState("countGoods")}
                     />
                  </div>
               </div>
               <div className="Calculator__row tw-w-full tw-flex">
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Длина</div>
                     <InputNumber
                        className="tw-w-full"
                        min="1"
                        addonAfter="см"
                        controls={false}
                        size="large"
                        onChange={onChangeState("length")}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Ширина</div>
                     <InputNumber
                        className="tw-w-full"
                        min="1"
                        addonAfter="см"
                        controls={false}
                        size="large"
                        onChange={onChangeState("width")}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Высота</div>
                     <InputNumber
                        className="tw-w-full"
                        min="1"
                        addonAfter="см"
                        controls={false}
                        size="large"
                        onChange={onChangeState("height")}
                     />
                  </div>
                  <div className="tw-w-full">
                     <div className="text-base mb-2  font-medium">Вес</div>
                     <InputNumber
                        className="tw-w-full"
                        min={0}
                        decimalSeparator=","
                        addonAfter="кг"
                        controls={false}
                        size="large"
                        onChange={onChangeState("weight")}
                     />
                  </div>
               </div>
               <div className="tw-w-full">
                  <div className="text-base mb-2  font-medium">Процент выкупа</div>
                  <Slider
                     value={Number(calculator.redemptionPercent)}
                     onChange={onChangeState("redemptionPercent")}
                  />
               </div>
               <div className="tw-w-full">
                  <div className="text-base mb-2 font-medium">Налог</div>
                  <Segmented
                     options={[
                        {
                           caption: "Самозанятый - 6%",
                           value: 6,
                           icon: <UserOutlined />,
                        },
                        {
                           caption: "Доходы минус расходы - 15%",
                           value: 15,
                           icon: <ArrowPathRoundedSquareIcon className="w-5 h-5 tw-inline-block" />,
                        },
                     ]}
                     onChange={onChangeState("tax")}
                     selectedValue={calculator.tax}
                  />
               </div>
               <div>
                  <div className="text-base mb-2 font-medium mt-3">Формат хранения</div>
                  <div className="Calculator__storage-scheme tw-flex">
                     {radioOptions.map((item, index) => (
                        <div className="tw-flex tw-w-full" key={index}>
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
                        </div>
                     ))}
                  </div>
               </div>
            </Col>
            <Col xs={24} lg={8} xl={8}>
               <Result {...result} />
            </Col>
         </Row>
      </div>
   );
};

export default CalculatorPage;
