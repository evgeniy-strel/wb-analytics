import React, { useEffect, useState } from "react";
import "./index.scss";

import { Progress, Input, Button, Result, Modal, Skeleton } from "antd";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";

import {
   ShoppingBagIcon,
   BanknotesIcon,
   StarIcon,
   ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

import { Stats, IStats } from "./Stats";
import Img from "./Img";
import { GenerateImgUrl, setDelay } from "../../helpers";
import axios from "axios";

const { Search } = Input;

const AnalyticsProduct = () => {
   const [product, setProduct] = useState<any>({});
   const [img, setImg] = useState<string>("");

   const [percentRating, setPercentRating] = useState<number>(0);
   const [isDataSuccess, setIsDataSuccess] = useState<boolean>();

   const [isSearched, setIsSearched] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchValue, setSearchValue] = useState<string>("");

   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";

   useEffect(() => {
      setPercentRating(90); // плавная анимация полоски рейтинга
   }, []);

   const onSearch = async (value: string) => {
      const isSearchValid = isValidSearch(value);

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

   const fetchProduct = () => {
      const articul = getArticul(searchValue);

      const img = new GenerateImgUrl(+articul);
      setImg(img.url());

      axios
         .get(`${backURL}/analitics?articul=${articul}`)
         .then(({ data }: any) => {
            setProduct(data);
            console.log(data, "data");
         })
         .catch(() => setIsDataSuccess(false))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onChangeSearch = (event: any) => {
      setSearchValue(event.target.value);
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
      const config = {
         title: "Неверное значение",
         content: <>Проверьте корректность ссылки на товар или его артикула</>,
      };

      Modal.error(config);
   };

   const Rating = (
      <div className="tw-flex tw-w-full tw-items-center gap-4">
         <Progress percent={percentRating} showInfo={false} />
         <div className="text-3xl font-medium">{product?.supplier_rating}</div>
      </div>
   );

   const Seller = (
      // <Link to="https://www.wildberries.ru/seller/557640" target="_blank" rel="noreferrer">
      <div style={{ padding: 0 }} className="text-3xl font-medium tw-truncate">
         {product?.supplier}
      </div>
      // </Link>
   );

   const SearchInput = (
      <Search
         className="mt-1 mb-4"
         size="large"
         placeholder="Вставьте ссылку товара на WB"
         enterButton="Анализировать"
         value={searchValue}
         allowClear
         loading={isLoading}
         onChange={onChangeSearch}
         onSearch={onSearch}
      />
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
         icon: <BanknotesIcon className="w-4 h-4" />,
         value: dailySales,
         afterValue: "₽",
         percent: 13,
      },
      {
         caption: "Выручка за неделю",
         icon: <BanknotesIcon className="w-4 h-4" />,
         value: Math.round(dailySales * 7 - dailySales / 4.4),
         afterValue: "₽",
         percent: 13,
      },
      {
         caption: "Выручка за все время",
         icon: <BanknotesIcon className="w-4 h-4" />,
         value: Math.round(((product?.feedbacks * product?.sale_price_u) / 100) * 2.5),
         afterValue: "₽",
      },
      {
         caption: "Рейтинг товара",
         icon: <StarIcon className="w-4 h-4" />,
         customContent: Rating,
      },
      {
         caption: "Количество отзывов",
         icon: <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />,
         value: Number(product?.feedbacks),
      },
      {
         caption: "Продавец",
         icon: <ShoppingBagIcon className="w-4 h-4" />,
         customContent: Seller,
      },
   ];

   if (!isSearched) {
      return (
         <>
            {SearchInput}
            <Result
               status="404"
               title="Статистика не построена"
               subTitle="Для получения статистики вставьте ссылку товара или его артикул"
            />
         </>
      );
   }

   if (isDataSuccess === false) {
      return (
         <>
            {SearchInput}
            <Result
               status="500"
               title="Ничего не найдено"
               subTitle="Вы ввели неверную ссылку/артикул или мы пока не собрали статистику по этому товару"
            />
         </>
      );
   }

   const Title = ({ message }: { message: string }): JSX.Element => {
      return (
         <div>
            {isLoading ? (
               <ContentLoader
                  speed={3}
                  width="45rem"
                  height="2.25rem"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb">
                  <rect x="0" y="0" rx="5" ry="5" width="45rem" height="2.25rem" />
               </ContentLoader>
            ) : (
               message
            )}
         </div>
      );
   };

   const Article = ({ value, href }: { value: number; href: string }): JSX.Element => {
      return (
         <div className="tw-flex tw-items-center gap-3 text-base font-normal">
            {isLoading ? (
               <ContentLoader
                  speed={3}
                  width="9rem"
                  height="1.75rem"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb">
                  <rect x="0" y="0" rx="5" ry="5" width="9rem" height="1.75rem" />
               </ContentLoader>
            ) : (
               <>
                  <div className="whitespace-nowrap">Арт: {product.wb_id}</div>
                  <div className="tw-flex-shrink-0">
                     <a href={product.url} target="_blank" rel="noreferrer">
                        <img src="assets/wb-icon.jpg" alt="" className="rounded w-8 h-8" />
                     </a>
                  </div>
               </>
            )}
         </div>
      );
   };

   return (
      <div className="AnalyticsProduct py-1">
         {SearchInput}
         <>
            <div className="tw-flex tw-flex-wrap gap-x-4 gap-y-1 tw-items-center tw-justify-between text-3xl font-medium my-1">
               <Title message={product?.name} />
               <Article
                  value={product.wb_id}
                  href="https://www.wildberries.ru/catalog/145125374/detail.aspx"
               />
            </div>
            <div className="AnalyticsProduct__grid my-3">
               {statsData.map(
                  ({ caption, icon, value, afterValue, percent, customContent }, index) => (
                     <Stats
                        key={index}
                        caption={caption}
                        icon={icon}
                        value={value}
                        afterValue={afterValue}
                        percent={percent}
                        customContent={customContent}
                        isLoading={isLoading}
                     />
                  ),
               )}
               <div className="AnalyticsProduct__image shadow py-3 px-4 text-base rounded-md tw-flex tw-flex-col tw-justify-center">
                  <Img href={product?.url} src={img} isLoading={isLoading} />
               </div>
            </div>
         </>
      </div>
   );
};

export default AnalyticsProduct;
