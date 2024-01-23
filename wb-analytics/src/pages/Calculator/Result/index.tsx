import React from "react";

import { IResultCalculator } from "../../../helpers";

interface IRow {
   title: string;
   value: number;
   afterValue?: string;
}

const Row = ({ title, value, afterValue = "₽" }: IRow): JSX.Element => (
   <div className="tw-flex tw-justify-between">
      <div className="mb-2">{title}</div>
      <div className="font-medium">
         {value} {afterValue}
      </div>
   </div>
);

const Rows = ({ rows }: { rows: IRow[] }): JSX.Element => {
   return (
      <>
         {rows.map(({ title, value, afterValue }, index) => (
            <Row key={index} title={title} value={value} afterValue={afterValue} />
         ))}
      </>
   );
};

const Result = (args: IResultCalculator) => {
   const rowsFirst: IRow[] = [
      {
         title: "Комиссия маркетплейса",
         value: args.wbComission,
      },
      {
         title: "Хранение в месяц",
         value: args.storagePerMonth,
      },
      {
         title: "Стоимость логистики",
         value: args.logisticCost,
      },
      {
         title: "Налоги",
         value: args.taxes,
      },
      {
         title: "Маржинальность",
         value: args.marginalProfit,
         afterValue: "%",
      },
   ];

   const rowsSecond: IRow[] = [
      {
         title: "Затраты",
         value: args.expenses,
      },
      {
         title: "Прибыль",
         value: args.profit,
      },
   ];

   const rowsThird: IRow[] = [
      {
         title: "Затраты",
         value: args.expensesTotal,
      },
      {
         title: "Прибыль",
         value: args.profitTotal,
      },
   ];

   return (
      <div className="tw-w-full">
         <div className="text-base mb-3 font-medium uppercase ">Результаты расчета</div>
         <div className="pt-3 pb-1  px-4 rounded-xl text-white tw-w-full text-lg bg-gray-900">
            <Rows rows={rowsFirst} />
         </div>
         <div className="text-base my-3 font-medium uppercase">На единицу товара</div>
         <div
            className="pt-3 pb-1  px-4 rounded-xl bg-blue-color text-white tw-w-full text-lg"
            style={{ background: "#e24675" }}>
            <Rows rows={rowsSecond} />
         </div>
         <div className="text-base my-3 font-medium uppercase">Итого</div>
         <div className="pt-3 pb-1  px-4 rounded-xl bg-blue-color text-white tw-w-full text-lg">
            <Rows rows={rowsThird} />
         </div>
      </div>
   );
};

export default Result;
