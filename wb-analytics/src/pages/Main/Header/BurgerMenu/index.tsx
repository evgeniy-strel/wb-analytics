import React, { useState } from "react";

import { MenuOutlined, SketchOutlined } from "@ant-design/icons";
import { EnvelopeIcon, HandThumbUpIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Drawer } from "antd";

const BurgerMenu = () => {
   const [open, setOpen] = useState(false);

   const showDrawer = () => {
      setOpen(true);
   };

   const onClose = () => {
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
            onClose={onClose}
            open={open}>
            <div className="tw-flex tw-flex-col">
               <div>
                  <a href="#opportunites" onClick={onClose}>
                     <div className="tw-flex gap-3 tw-items-center cursor-pointer mb-7">
                        <Cog6ToothIcon className="w-5 h-5" />
                        <div className="leading-3">Возможности</div>
                     </div>
                  </a>
                  <a href="#advantages" onClick={onClose}>
                     <div className="tw-flex gap-3 tw-items-center cursor-pointer mb-7">
                        <HandThumbUpIcon className="w-5 h-5" />
                        <div className="leading-3">Преимущества</div>
                     </div>
                  </a>
                  <a href="#contacts" onClick={onClose}>
                     <div className="tw-flex gap-3 tw-items-center cursor-pointer">
                        <EnvelopeIcon className="w-5 h-5"></EnvelopeIcon>
                        <div className="leading-3">Контакты</div>
                     </div>
                  </a>
               </div>
            </div>
         </Drawer>
      </>
   );
};

export default BurgerMenu;
