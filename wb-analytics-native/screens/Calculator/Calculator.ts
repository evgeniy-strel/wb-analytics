import { Taxes } from ".";
import { ICalculator, IResultCalculator } from "../../helpers";

export default class Calculator {
   /* цены за 1 литр */
   private static logistic: number = 10;
   private static storage: number = 0.12; /* за сутки

      /* аргументы принимают в СИ сантиметры */
   private static calculateLitres(length: number, width: number, height: number): number {
      return (length * width * height) / 1000;
   }

   static calculateProfit(args: ICalculator): IResultCalculator {
      const result: IResultCalculator = {
         wbComission: 0,
         storagePerMonth: 0,
         logisticCost: 0,
         taxes: 0,
         expenses: 0,
         expensesTotal: 0,
         profit: 0,
         profitTotal: 0,
         marginalProfit: 0,
      };

      if (Object.values(args).some((value) => !value)) {
         return result;
      }

      const litres = Calculator.calculateLitres(args.length!, args.width!, args.height!);
      const percentCategoryComission = args.subCategory?.wb_commission / 100 || 0;

      result.wbComission = args.priceOnWB! * percentCategoryComission;
      result.storagePerMonth = args.storageScheme!.title === "FBO" ? this.storage * litres * 30 : 0;
      result.logisticCost = Math.max(
         (args.storageScheme!.title !== "DBS"
            ? this.logistic * litres * (args.weight! > 25 ? Number(args.weight) / 13 : 1)
            : 0) /
            (args.redemptionPercent / 100),
         args.storageScheme!.title !== "DBS" ? 40 : 0,
      );
      result.taxes =
         args.tax == 6
            ? args.priceOnWB! * 0.06
            : (args.priceOnWB! - (args.costPrice! + result.wbComission)) * 0.15;
      result.expenses = Math.round(
         args.costPrice! +
            result.wbComission +
            result.storagePerMonth +
            result.logisticCost +
            result.taxes,
      );
      result.expensesTotal = result.expenses * args.countGoods;
      result.profit = Math.round(args.priceOnWB! - result.expenses);
      result.profitTotal = result.profit * args.countGoods;
      result.marginalProfit = (result.profit / args.costPrice!) * 100;

      for (let key in result) {
         //@ts-ignore
         result[key] = Math.round(result[key]);
      }

      return result;
   }

   static createObject() {
      return {
         category: "",
         subCategory: null,
         priceOnWB: null,
         costPrice: null,
         countGoods: 1,
         length: null,
         width: null,
         height: null,
         weight: null,
         redemptionPercent: 90,
         tax: Taxes.selfEmployed,
         storageScheme: null,
      };
   }
}
