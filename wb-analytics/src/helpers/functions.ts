import axios from "axios";

export const setDelay = (delay: number): Promise<any> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(true);
      }, delay);
   });
};

export class GenerateImgUrl {
   protected nmId: number;
   protected size: string;
   protected number: number;
   protected format: string;

   constructor(nmId: number, photoSize?: string, photoNumber?: number, format?: string) {
      if (typeof nmId !== "number" || nmId < 0) {
         throw new Error("Invalid nmId value");
      }
      this.nmId = parseInt(nmId.toString(), 10);
      this.size = photoSize || "big"; //"c246x328";
      this.number = photoNumber || 1;
      this.format = format || "webp"; //"jpg";
   }

   getHost(id: number) {
      const urlParts = [
         { range: [0, 143], url: "//basket-01.wb.ru" },
         { range: [144, 287], url: "//basket-02.wb.ru" },
         { range: [288, 431], url: "//basket-03.wb.ru" },
         { range: [432, 719], url: "//basket-04.wb.ru" },
         { range: [720, 1007], url: "//basket-05.wb.ru" },
         { range: [1008, 1061], url: "//basket-06.wb.ru" },
         { range: [1062, 1115], url: "//basket-07.wb.ru" },
         { range: [1116, 1169], url: "//basket-08.wb.ru" },
         { range: [1170, 1313], url: "//basket-09.wb.ru" },
         { range: [1314, 1601], url: "//basket-10.wb.ru" },
         { range: [1602, 1655], url: "//basket-11.wb.ru" },
         { range: [1656, 1919], url: "//basket-12.wb.ru" },
         { range: [1920, 2045], url: "//basket-13.wb.ru" },
         { range: [2046, Infinity], url: "//basket-14.wb.ru" },
      ];

      const { url }: any = urlParts.find(({ range }) => id >= range[0] && id <= range[1]);
      return url;
   }

   url() {
      const vol = ~~(this.nmId / 1e5),
         part = ~~(this.nmId / 1e3);
      return `https:${this.getHost(vol)}/vol${vol}/part${part}/${this.nmId}/images/${this.size}/${
         this.number
      }.${this.format}`;
   }
}
