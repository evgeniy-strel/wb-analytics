import React, { useEffect } from "react";

import { Route, Routes, Link } from "react-router-dom";

import { Header } from "./components";
import {
   MainPage,
   BestCategories,
   Calculator,
   TopProducts,
   AnalyticsProduct,
   NotFound,
} from "./pages";
import "./style.scss";
import "./reset-ant.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCategories, setCategoriesFull } from "./store/data/dataSlice";

const FunctionalPages = (): JSX.Element => {
   return (
      <div className="container">
         <Header />
         <main className="bg-white shadow rounded-xl py-3.5 px-5 mt-4">
            <Routes>
               <Route path="/best_categories" element={<BestCategories />} />
               <Route path="/top_products" element={<TopProducts />} />
               <Route path="/analytics_product" element={<AnalyticsProduct />} />
               <Route path="/calculator" element={<Calculator />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </div>
   );
};

function App(): JSX.Element {
   const backURL = "https://79b4-31-162-87-187.ngrok-free.app";
   const dispatch = useDispatch();

   useEffect(() => {
      axios
         .get(`${backURL}/calc/cat_list`)
         .then(({ data }: any) => {
            dispatch(setCategories(data.categories));
         })
         .catch(() => alert("Ошибка БД"));
   }, []);

   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="*" element={<FunctionalPages />} />
      </Routes>
   );
}

export default App;
