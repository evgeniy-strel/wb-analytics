import React, { useEffect, useState } from "react";
import "./index.scss";
import { SketchOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <div className="main__header bg-white py-4 px-8 text-lg tw-flex tw-items-center tw-justify-between">
         <div className="tw-flex tw-items-center tw-flex-wrap gap-4 text-2xl font-semibold whitespace-nowrap">
            <SketchOutlined style={{ fontSize: "2rem", color: "#1677ff" }} />
            <div className="hidden-xs2">WB Analytics</div>
         </div>
         <div className="main__header__items tw-flex tw-items-center gap-8 hide-lg">
            <div className="cursor-pointer">
               <a href="#opportunites">Возможности</a>
            </div>
            <div className="cursor-pointer">
               <a href="#advantages">Преимущества</a>
            </div>
            <div className="cursor-pointer">
               <a href="#contacts">Контакты</a>
            </div>
         </div>
         <div className="main__header__items tw-flex tw-items-center hide-lg">
            <Link to="/best_categories">
               <Button type="primary" size="large">
                  Попробовать
               </Button>
            </Link>
         </div>
         <BurgerMenu />
      </div>
   );
};

export default Header;
