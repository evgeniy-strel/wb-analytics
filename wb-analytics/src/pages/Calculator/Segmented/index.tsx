import React from "react";
import "./index.scss";

interface IOption {
   caption: string; // заголовок
   value: string | number; // значение
   icon?: JSX.Element; // иконка
}

interface ISegmented {
   options: IOption[];
   selectedValue: IOption["value"];
   onChange: (value: IOption["value"]) => void;
}

const Segmented = ({ options, selectedValue, onChange }: ISegmented) => {
   return (
      <div className="segmented tw-flex bg-gray-100 rounded-lg px-1 py-1 cursor-pointer">
         {options.map(({ caption, value, icon }) => (
            <div
               className={`tw-w-full tw-flex tw-justify-center tw-items-center gap-2 py-2 text-center rounded-lg ${
                  selectedValue === value
                     ? "segmented_active"
                     : "text-gray-800 hover:bg-gray-300 hover:text-gray-900"
               } `}
               key={value}
               onClick={() => onChange(value)}>
               <div>{icon}</div>
               <div>{caption}</div>
            </div>
         ))}
      </div>
   );
};

export default Segmented;
