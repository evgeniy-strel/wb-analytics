import { BestCategories, TopProducts, AnalyticsProduct, Calculator } from "./../screens";

export enum Taxes {
   selfEmployed = 6,
   incomeMinusExpenses = 13,
}

export const screens = {
   BestCategories: {
      title: "В тренде",
      headerTitle: "Самые выгодные ниши",
      icon: "flash",
      iconOutline: "flash-outline",
      component: BestCategories,
   },
   TopProducts: {
      title: "Топ товаров",
      headerTitle: "Топ товаров",
      icon: "trophy",
      iconOutline: "trophy-outline",
      component: TopProducts,
   },
   AnalyticsProduct: {
      title: "Анализ товара",
      headerTitle: "Анализ товара",
      icon: "cellular",
      iconOutline: "cellular-outline",
      component: AnalyticsProduct,
   },
   Calculator: {
      title: "Калькулятор",
      headerTitle: "Калькулятор прибыли",
      icon: "calculator",
      iconOutline: "calculator-outline",
      component: Calculator,
   },
};
