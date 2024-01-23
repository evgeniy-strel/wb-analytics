import React, { useState } from "react";

import { MenuOutlined, SketchOutlined } from "@ant-design/icons";

import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { IItem } from "..";

interface IBurgerMenuProps {
   items: IItem[];
}

const BurgerMenu = ({ items }: IBurgerMenuProps) => {
   const [open, setOpen] = useState(false);

   const showDrawer = () => {
      setOpen(true);
   };

   const hideDrawer = () => {
      setOpen(false);
   };

   return (
      <>
         <MenuOutlined className="show-lg text-xl" onClick={showDrawer} />
         <Drawer
            size="large"
            className="text-xl"
            title={
               <div className="tw-flex tw-items-center tw-flex-wrap gap-4 text-2xl font-semibold whitespace-nowrap">
                  <SketchOutlined style={{ fontSize: "2rem", color: "#1677ff" }} />
                  <div>WB Analytics</div>
               </div>
            }
            placement="right"
            onClose={hideDrawer}
            open={open}>
            <div className="tw-flex tw-flex-col">
               <div>
                  {items.map(({ label, key, icon }) => (
                     <Link key={key} to={key} onClick={hideDrawer}>
                        <div className="tw-flex gap-3 tw-items-center cursor-pointer mb-7">
                           <div>{icon}</div>
                           <div className="leading-3">{label}</div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </Drawer>
      </>
   );
};

export default BurgerMenu;
