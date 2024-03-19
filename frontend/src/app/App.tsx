import Navbar from '../widgets/header/Navbar';
import Footer from '../widgets/footer/Footer';

import MainPage from '../pages/Main';
import LoginPage from '../pages/SignIn';
import FittingPage from '../pages/Fitting';
import FeedPage from '../pages/Feed';
import AnalysisPage from '../pages/Analysis';
import MyPage from '../pages/My';
import RecommendationPage from '../pages/Recommendation';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/fitting" element={<FittingPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/analysis/*" element={<AnalysisPage />}>
          <Route path="my" element={<MyPage />}></Route>
          <Route path="recommendation" element={<RecommendationPage />}></Route>
        </Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>
  );
};

export default Router;
