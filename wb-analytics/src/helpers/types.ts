import { IItem } from "../components/Radio";
import { Taxes } from "./const";

/* интерфейс строки таблицы Ant Design */
export interface IRowTableData {
   key: string | number;
   subcategory: string;
}

/* интерфейс строки таблицы лучшей подкатегории */
export interface IRowBestCategoryTable extends IRowTableData {
   average_price: number | string;
   sales_per_day: number | string;
   revenue_per_month: number | string;
}

/* интерфейс строки таблицы лучшего товара */
export interface IRowBestProductTable extends IRowTableData {
   category: string;
   title: string;
   articul: number;
   price: number | string;
   sales_per_day: number | string;
}

/* схема хранения товара */
export type TStorageScheme = "FBO" | "FBS" | "DBS";

/* Поля калькулятора */
export interface ICalculator {
   category: string | null;
   subCategory: Object | null | any;
   priceOnWB: number | null;
   costPrice: number | null;
   countGoods: number;
   length: number | null;
   width: number | null;
   height: number | null;
   weight: number | null;
   redemptionPercent: number;
   tax: Taxes;
   storageScheme: IItem | null;
}

/* результат калькулятора */
export interface IResultCalculator {
   /* комиссия WB */
   wbComission: number;
   /* стоимость хранения в месяц*/
   storagePerMonth: number;
   /* стоимость логистики */
   logisticCost: number;
   /* налоги */
   taxes: number;
   /* маржинальная прибыль */
   marginalProfit: number;
   /* затраты на 1 единицу */
   expenses: number;
   /* прибыль на 1 единицу */
   profit: number;
   /* итоговые затраты */
   expensesTotal: number;
   /* итоговая прибыль */
   profitTotal: number;
}
