import React from "react";

import ContentLoader from "react-content-loader";
import CountUp from "react-countup";

export interface IStats {
   caption: string; // заголовок
   icon?: any; // иконка после заголовка
   value?: number; // число-значение под заголвком
   percent?: number; // процент разницы между сегодня и вчера, отображается в нижнем правом углу
   afterValue?: JSX.Element | string; // контент, отображаемый после value
   customContent?: JSX.Element | string; // при необходимости можно отобразить кастомный контент
   isLoading?: boolean; // отображение скелетона в случае загрузки
}

export const Stats = ({
   caption,
   icon,
   value,
   percent,
   afterValue,
   customContent,
   isLoading,
}: IStats) => {
   const content = customContent || (
      <div className="tw-flex tw-flex-wrap gap-2.5 tw-items-end">
         <div className="text-3xl font-medium">
            {typeof value === "number" ? (
               <CountUp duration={1.5} end={value} separator=" " />
            ) : (
               value
            )}{" "}
            {afterValue}
         </div>
         {/* {percent && (
            <div className="text-base text-gray-500">
               вчера <CountUp duration={1.5} end={value!} separator=" " /> {afterValue}
            </div>
         )} */}
      </div>
   );

   return (
      <div className="shadow py-3 px-4 text-base rounded-md tw-flex tw-flex-col tw-justify-center">
         <div className="text-lg pb-3">
            <div className="tw-flex tw-items-center gap-2">
               {caption} {icon}
            </div>
         </div>
         <div className="tw-flex tw-items-baseline gap-2">
            {isLoading ? (
               <ContentLoader
                  speed={2}
                  width="10rem"
                  height="1.75rem"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb">
                  <rect x="0" y="0" rx="5" ry="5" width="10rem" height="1.75rem" />
               </ContentLoader>
            ) : (
               content
            )}

            {/* {percent && (
               <div className="tw-flex ml-auto tw-items-center gap-1 bg-green-200/50 text-green-800  rounded py-0.5 px-2 tw-flex-shrink-0">
                  <ArrowUpOutlined />
                  <div>
                     <CountUp duration={1.5} end={percent} separator=" " /> %
                  </div>
               </div>
            )} */}
         </div>
      </div>
   );
};
