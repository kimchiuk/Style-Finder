import React from 'react';

import Header from '../widgets/Header/Header';
import Footer from '../widgets/Footer/Footer';

import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import FittingPage from '../pages/FittingPage';
import FeedPage from '../pages/FeedPage';
import AnalysisPage from '../pages/AnalysisPage';
import MyInfoPage from '../pages/MyInfoPage';
import RecommendationPage from '../pages/RecommendationPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/fitting" element={<FittingPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/analysis/*" element={<AnalysisPage />}>
          <Route path="myinfo" element={<MyInfoPage />}></Route>
          <Route path="recommendation" element={<RecommendationPage />}></Route>
        </Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>
  );
};

export default Router;
