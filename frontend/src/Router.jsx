import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import SkillDetailPage from './pages/SkillDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DistillCreatePage from './pages/DistillCreatePage.jsx';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skill/:id" element={<SkillDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/distill/create" element={<DistillCreatePage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
