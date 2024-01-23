import React, { useState } from "react";
import "./index.scss";

import Header from "./Header";
import { Button, Col, Form, Image, Input, InputNumber, Row, notification } from "antd";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

interface IOpportunity {
   title: string;
   description: string;
   img: string;
}

const OPPORTUNITES: IOpportunity[] = [
   {
      title: "Самые прибыльные категории",
      description:
         "Узнать, в каких категориях Wildberries представлено больше всего товаров, где выше выручка, где самый высокий процент продаж, а где самое большое количество возвратов, позволит отчет Анализ категории.",
      img: "assets/screens/best-categories.png",
   },
   {
      title: "Топ товаров",
      description:
         "Узнать, в каких категориях Wildberries представлено больше всего товаров, где выше выручка, где самый высокий процент продаж, а где самое большое количество возвратов, позволит отчет Анализ категории.",
      img: "assets/screens/best-products.png",
   },
   {
      title: "Анализ товара",
      description:
         "Узнать, в каких категориях Wildberries представлено больше всего товаров, где выше выручка, где самый высокий процент продаж, а где самое большое количество возвратов, позволит отчет Анализ категории.",
      img: "assets/screens/analytics-product.png",
   },
   {
      title: "Калькулятор прибыли",
      description:
         "Узнать, в каких категориях Wildberries представлено больше всего товаров, где выше выручка, где самый высокий процент продаж, а где самое большое количество возвратов, позволит отчет Анализ категории.",
      img: "assets/screens/calculator-profit.png",
   },
];

const ADVANTAGES: IOpportunity[] = [
   {
      title: "Бесплатный доступ",
      description: "Полный функционал без ограничений к вашему распоряжению",
      img: "assets/advantages/bubbles.png",
   },
   {
      title: "Адаптирован",
      description:
         "Установите мобильное приложение или пользуйтесь удобным сайтом с любого устройства",
      img: "assets/advantages/mobile.png",
   },
   {
      title: "Поможем найти тренды",
      description: "Анализируйте товары и категории, которые популярны прямо сейчас",
      img: "assets/advantages/trands.png",
   },
   {
      title: "Актуальные данные",
      description: "Регулярно обновляем статистику и предоставляем свежую информацию",
      img: "assets/advantages/time.png",
   },
   {
      title: "Сегментарный анализ",
      description: "Поможем определить оптимальную цену для товара через наш калькулятор",
      img: "assets/advantages/calculator.png",
   },
];

type FieldType = {
   name?: string;
   email?: string;
   phone?: number;
};

const Context = React.createContext({ name: "Default" });

const MainPage = () => {
   const [activeOpportunity, setActiveOpportunity] = useState<IOpportunity>(OPPORTUNITES[0]);

   const onClickOpportunity = (value: IOpportunity) => {
      setActiveOpportunity(value);
   };

   const [api, contextHolder] = notification.useNotification();

   const openNotification = () => {
      notification.success({ message: "Форма была успешно отправлена" });
   };

   const onFinishForm = () => {
      openNotification();
   };

   return (
      <div className="main my-8">
         {contextHolder}
         <div className="main__container">
            <Header />
            <main>
               {/* Первый экран */}
               <div className="main__container__first-screen tw-flex tw-flex-col tw-justify-center">
                  <div className="py-12">
                     <Row className="review mb-28" gutter={[{ xs: 8 }, { xs: 16 }]}>
                        <Col xs={24} sm={24} md={13} lg={12} xl={10}>
                           <div className="review__title text-5xl font-bold">
                              Сервис для аналитики и повышения количества продаж на WILDBERRIES
                           </div>
                           <div className="text-xl my-6">
                              Наш сервис поможет узнать первым об трендах, найти перспективные ниши
                              и увеличить продажи. Попробуй функционал WB Analytics - это бесплатно!
                           </div>
                           <div className="review__try-button text-xl font-medium bg-blue-color text-white text-center rounded-2xl cursor-pointer">
                              <Link className="btn_box px-8 py-4 tw-w-full" to="/best_categories">
                                 <span className="btn_flare"></span>Попробовать бесплатно
                              </Link>
                           </div>
                        </Col>
                        <Col xs={24} sm={24} md={11} lg={12} xl={14}>
                           <div className="review__picture">
                              <img src="assets/review.png" alt="" />
                           </div>
                        </Col>
                     </Row>
                     <Row gutter={[{ xs: 8, md: 16 }, { xs: 12 }]}>
                        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                           <div className="text-center">
                              <div className="text-5xl font-medium">
                                 <CountUp end={1000} separator=" " />
                              </div>
                              <div className="text-lg my-2">товаров</div>
                           </div>
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                           <div className="text-center">
                              <div className="text-5xl font-medium">
                                 <CountUp end={666} separator=" " />
                              </div>
                              <div className="text-lg my-2">активных пользователей</div>
                           </div>
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                           <div className="text-center">
                              <div className="text-5xl font-medium">
                                 <CountUp end={777} separator=" " />
                              </div>
                              <div className="text-lg my-2">категорий</div>
                           </div>
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                           <div className="text-center">
                              <div className="text-5xl font-medium">
                                 <CountUp end={5} separator=" " />
                              </div>
                              <div className="text-lg my-2">дней назад обновляли статистику</div>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </div>
               {/* Второй экран */}
               <div id="opportunites" className="main__container__second-screen text-white py-12">
                  <div className="text-4-5xl font-medium pb-8">Что умеет сервис?</div>
                  <div className="tw-flex tw-flex-wrap gap-6">
                     {OPPORTUNITES.map((value, index) => (
                        <div
                           key={index}
                           className={`opportunity text-xl px-8 py-3 cursor-pointer rounded-3xl bg-white text-black ${
                              activeOpportunity.title === value.title ? "opportunity_active" : ""
                           }`}
                           onClick={() => onClickOpportunity(value)}>
                           {value.title}
                        </div>
                     ))}
                  </div>
                  <div className="text-3xl font-medium py-6">{activeOpportunity.title}</div>
                  <div className="text-xl pb-4">{activeOpportunity.description}</div>
                  <Image className="rounded-xl" src={activeOpportunity.img} alt="" />
                  <div className="review__try-button review__try-button_white mt-4 text-xl font-medium bg-white text-gray-900 text-center rounded-2xl cursor-pointer">
                     <Link className="btn_box px-8 py-4 tw-w-full" to="/best_categories">
                        Попробовать бесплатно
                     </Link>
                  </div>
               </div>
               {/* Третий экран */}
               <div id="advantages" className="main__container__third-screen pt-12">
                  <div className="text-4-5xl font-medium pb-8">
                     За что выбирают <span className="text-blue-color">WB Analytics</span>
                  </div>
                  <Row className="pb-12" gutter={[{ xs: 8, md: 16, lg: 24, xl: 32 }, { xs: 12 }]}>
                     <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        {ADVANTAGES.map((value, index) => (
                           <div key={index} className="px-10 py-6 bg-white rounded-3xl mb-4">
                              <Row gutter={[{ xs: 8, md: 16 }, { xs: 12 }]}>
                                 <Col xs={16} sm={18} md={20} lg={20} xl={20}>
                                    <div className="text-2xl font-medium">{value.title}</div>
                                    <div className="text-xl pt-1.5">{value.description}</div>
                                 </Col>
                                 <Col xs={8} sm={6} md={4} lg={4} xl={4}>
                                    <img src={value.img} alt="" />
                                 </Col>
                              </Row>
                           </div>
                        ))}
                     </Col>
                     <Col xs={0} sm={0} md={0} lg={8} xl={8}>
                        <img src="assets/advantages/sprites.png" alt="" />
                        <div className="mirror__container">
                           <img
                              className="mirror"
                              src="assets/advantages/sprites-mirror.png"
                              alt=""
                           />
                        </div>
                     </Col>
                  </Row>
                  <div
                     id="contacts"
                     className="questions-block py-12 px-12 bg-white text-white rounded-3xl">
                     <Row>
                        <Col xs={24} sm={24} md={12} lg={14} xl={14}>
                           <div className="text-4xl font-medium pb-4">Остались вопросы?</div>
                           <div className="text-lg pb-4">Напишите нам и мы постараемся помочь</div>
                           <Form
                              name="basic"
                              style={{ maxWidth: 400 }}
                              initialValues={{ remember: true }}
                              onFinish={onFinishForm}
                              autoComplete="off">
                              <Form.Item<FieldType>
                                 name="name"
                                 rules={[{ required: true, message: "Введите ваше имя" }]}>
                                 <Input
                                    size="large"
                                    placeholder="Введите имя"
                                    prefix={<UserOutlined />}
                                 />
                              </Form.Item>
                              <Form.Item<FieldType>
                                 name="email"
                                 rules={[{ required: true, message: "Введите вашу почту" }]}>
                                 <Input
                                    size="large"
                                    placeholder="Введите почту"
                                    prefix={<MailOutlined />}
                                 />
                              </Form.Item>
                              <Form.Item<FieldType> name="phone">
                                 <InputNumber
                                    size="large"
                                    className="tw-w-full"
                                    controls={false}
                                    placeholder="Введите телефон"
                                    prefix={<PhoneOutlined />}
                                 />
                              </Form.Item>
                              <Form.Item>
                                 <Button size="large" htmlType="submit">
                                    Отправить
                                 </Button>
                              </Form.Item>
                           </Form>
                        </Col>
                        <Col xs={0} sm={0} md={12} lg={10} xl={10}>
                           <video src="assets/questions-video.webm" autoPlay muted loop></video>
                        </Col>
                     </Row>
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
};

export default MainPage;
