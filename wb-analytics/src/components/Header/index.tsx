import React, { useState, useEffect } from "react";

import { SketchOutlined } from "@ant-design/icons";
import { CalculatorIcon, ChartBarIcon, BoltIcon, TrophyIcon } from "@heroicons/react/24/outline";

import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

export interface IItem {
   label: JSX.Element | string;
   key: string;
   icon: JSX.Element;
}

const iconItemClassName = "w-5 h-5 tw-inline-block";

const items: IItem[] = [
   {
      label: "Лучшие категории",
      key: "/best_categories",
      icon: <BoltIcon className={iconItemClassName} />,
   },
   {
      label: "Топ товаров",
      key: "/top_products",
      icon: <TrophyIcon className={iconItemClassName} />,
   },
   {
      label: "Анализ товара",
      key: "/analytics_product",
      icon: <ChartBarIcon className={iconItemClassName} />,
   },
   {
      label: "Калькулятор",
      key: "/calculator",
      icon: <CalculatorIcon className={iconItemClassName} />,
   },
];

const Header: React.FC = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const [current, setCurrent] = useState<string>();

   useEffect(() => {
      setCurrent(location.pathname);
   }, [location]);

   const onChangeCurrent = (activeKey: string) => {
      const route = items.find((item) => item.key === activeKey)?.key as string;
      setCurrent(route);
      navigate(route);
   };

   return (
      <header className="shadow rounded-b-lg tw-flex tw-justify-between py-2 px-4 py-4-lg bg-white">
         <div className="tw-flex tw-items-center tw-flex-wrap gap-4">
            <SketchOutlined style={{ fontSize: "2rem", color: "#1677ff" }} />
            <h1 className="text-2xl font-semibold whitespace-nowrap">WB Analytics</h1>
            <Tabs
               className="tw-flex-wrap ml-3 hide-lg"
               onChange={onChangeCurrent}
               size="large"
               activeKey={current}
               items={items}
            />
         </div>
         <BurgerMenu items={items} />
      </header>
   );
};

export default Header;
