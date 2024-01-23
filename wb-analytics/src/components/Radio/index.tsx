import React from "react";
import "./index.scss";

import { TStorageScheme } from "../../helpers";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export interface IItem {
   title: TStorageScheme;
   description: string;
}

export interface IProps {
   item: IItem;
   selectedItem: IItem | null;
   onClick: (item: IItem) => void;
}

const Radio = ({ item, selectedItem, onClick }: IProps) => {
   const isActive = selectedItem?.title === item.title;

   return (
      <div
         onClick={() => onClick(item)}
         className={`rounded-md py-3 px-4 border-gray-300 border radio ${
            isActive ? "radio_active" : ""
         }`}
         style={{ width: "100%" }}>
         <div className="tw-flex tw-justify-between">
            <div className="text-xl font-medium">{item.title}</div>
            {isActive && <CheckCircleIcon className="w-6 h-6 tw-inline-block radio__icon" />}
         </div>
         <div className="text-gray-900">{item.description}</div>
      </div>
   );
};

export default Radio;
