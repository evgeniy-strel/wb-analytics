import React from "react";

import ContentLoader from "react-content-loader";
import { Skeleton } from "@rneui/themed";
import { Image, Linking, Text, View, TouchableOpacity } from "react-native";

interface IImgProps {
   src: string;
   href: string;
   isLoading: boolean;
}

const Img = ({ src, href, isLoading }: IImgProps) => {
   if (isLoading) {
      return <Skeleton animation="pulse" width={1000} height={400} />;
   }

   return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(href)}>
         <Image
            className="rounded-md"
            source={{ uri: src }}
            style={{ width: "700", aspectRatio: "3/4" }}
         />
      </TouchableOpacity>
   );
};

export default Img;
