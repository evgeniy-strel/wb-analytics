import React from "react";
import "./Img.scss";

import ContentLoader from "react-content-loader";

interface IImgProps {
   src: string;
   href: string;
   isLoading: boolean;
}

const Img = ({ src, href, isLoading }: IImgProps) => {
   console.log(src);

   if (isLoading) {
      return (
         <ContentLoader
            speed={2}
            width="100%"
            height={260}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="0.375rem" ry="0.375rem" width="100%" height="260" />
         </ContentLoader>
      );
   }

   return (
      <a
         href={href}
         target="_blank"
         rel="noreferrer"
         className="img__product relative tw-flex tw-flex-col tw-items-center tw-justify-center">
         <div className="img__text_hover absolute opacity-0 text-white">Посмотреть на WB</div>
         <img className="rounded-md" src={src} />
      </a>
   );
};

export default Img;
