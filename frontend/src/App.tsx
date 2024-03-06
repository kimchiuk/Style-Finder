import React from 'react';

import Header from './common/nav/Header';
import Footer from './common/nav/Footer';

import MainPage from './components/Main/MainPage';
import LoginPage from './components/Login/LoginPage';
import FittingPage from './components/Fitting/FittingPage';
import FeedPage from './components/Feed/FeedPage';
import AnalysisPage from './components/Analysis/AnalysisPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/fitting" element={<FittingPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/analysis" element={<AnalysisPage />}></Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
