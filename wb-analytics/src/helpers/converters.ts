import { IRowTableData } from "./types";

export function convertToRubleFormat<IItem extends IRowTableData>(
   item: IItem,
   fields: Array<keyof IItem>,
): IItem {
   for (let key in item) {
      if (fields.includes(key)) {
         // @ts-ignore
         item[key as keyof IItem] += " ₽";
      }
   }

   return item;
}
