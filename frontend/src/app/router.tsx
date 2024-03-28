import MainPage from '../pages/main/main';
import LoginPage from '../pages/login/signIn';
import SignUpPage from '../pages/login/signUp';
import CoordiPage from '../pages/coordi/coordi';
import FeedPage from '../pages/feed/feed';
import FeedDetail from '../pages/feed/feedDetail';
import AnalysisPage from '../pages/analysis/analysis';
import MyPage from '../pages/my/my';
import RecommendationPage from '../pages/recommendation/recommendation';

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
        <Route path="/feeddetail/:feedId" element={<FeedDetail />}></Route>
        <Route path="/analysis/*" element={<AnalysisPage />}>
          <Route path="my" element={<MyPage />}></Route>
          <Route path="recommendation" element={<RecommendationPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
