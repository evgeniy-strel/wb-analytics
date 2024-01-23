export function convertToRubleFormat(item, fieldsIndex) {
   return item.map((value, index) => (fieldsIndex.includes(index) ? value + " ₽" : value));
}
