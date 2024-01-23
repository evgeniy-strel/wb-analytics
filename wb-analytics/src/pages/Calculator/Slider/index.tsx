import React from "react";
import { InputNumber, Slider as SliderAnt } from "antd";
import type { SliderMarks } from "antd/es/slider";

interface ISlider {
   value: number;
   onChange: (value: number | null) => void;
}

const Slider = ({ value, onChange }: ISlider): JSX.Element => {
   const formatter = (value: number | undefined) => `${value}%`;

   const marks: SliderMarks = {
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      60: "60",
      70: "70",
      80: "80",
      90: "90",
      100: "100",
   };

   return (
      <div className="tw-flex tw-items-center gap-5">
         <SliderAnt
            className="tw-w-full"
            value={value}
            defaultValue={90}
            onChange={onChange}
            tooltip={{ formatter }}
            marks={marks}
         />
         {/* <InputNumber className="w-14" min={0} max={100} value={value} onChange={onChange} /> */}
      </div>
   );
};

export default Slider;
