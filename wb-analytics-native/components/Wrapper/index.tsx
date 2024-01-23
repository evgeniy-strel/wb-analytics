import React, { useEffect, useRef } from "react";

import { SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getIsNeedScrollToTop } from "../../store/selectors";
import { setDontNeedScrollToTop } from "../../store/slices/screenSlice";

const Wrapper = ({ children }) => {
   const scrollRef = useRef();
   const isNeedScrollToTop = useSelector(getIsNeedScrollToTop);
   const dispatch = useDispatch();

   const scrollToTop = () => {
      scrollRef?.current?.scrollTo({
         y: 0,
         animated: true,
      });

      dispatch(setDontNeedScrollToTop());
   };

   useEffect(() => {
      if (isNeedScrollToTop) {
         scrollToTop();
      }
   }, [isNeedScrollToTop]);

   return (
      // <SafeAreaView>
      <ScrollView ref={scrollRef} className="px-3 w-full" vertical={false}>
         {/* <View style={{ height: bottomTabBarHeight, backgroundColor: "red", width: "100%" }} /> */}
         <View style={{ paddingBottom: 16, paddingTop: 16 }} className="overflow-hidden">
            {children}
         </View>
      </ScrollView>
      // </SafeAreaView>
   );
};

export default Wrapper;
