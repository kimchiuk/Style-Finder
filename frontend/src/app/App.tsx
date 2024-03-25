import MainPage from '../pages/Main';
import LoginPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';
import CoordiPage from '../pages/Coordi';
import FeedPage from '../pages/Feed';
import FeedDetail from '../pages/FeedDetail'
import AnalysisPage from '../pages/Analysis';
import MyPage from '../pages/My';
import RecommendationPage from '../pages/Recommendation';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/coordi" element={<CoordiPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/feeddetail" element={<FeedDetail />}></Route>
        <Route path="/analysis/*" element={<AnalysisPage />}>
          <Route path="my" element={<MyPage />}></Route>
          <Route path="recommendation" element={<RecommendationPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
