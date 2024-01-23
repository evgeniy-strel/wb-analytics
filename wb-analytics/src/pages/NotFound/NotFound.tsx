import React from "react";

import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
   return (
      <Result
         status="404"
         title="404"
         subTitle="Вы попали на несуществующую страницу"
         extra={
            <Link to="/best_categories">
               <Button type="primary">Перейти на главную</Button>
            </Link>
         }
      />
   );
};

export default NotFoundPage;
