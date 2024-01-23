import React, { useState } from "react";

import { Select as SelectAnt } from "antd";

interface IItem {
   value: string;
   label: string;
}

interface IProps {
   categories: any[];
   placeholder?: string;
   onChange: (item: string) => void;
   value: string | undefined | null;
   disabled?: boolean;
   className?: string;
}

const DEFAULT_CLASSNAME = "w-80 select-for-table";

const SelectForTable = (props: IProps) => {
   const items: IItem[] = props.categories?.length
      ? props.categories.map((name) => ({ value: name, label: name }))
      : [];

   const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

   return (
      <SelectAnt
         className={`${DEFAULT_CLASSNAME} ${props.className}`}
         size="large"
         showSearch
         optionFilterProp="children"
         filterOption={filterOption}
         options={items}
         listHeight={444}
         {...props}
      />
   );
};

export default SelectForTable;
