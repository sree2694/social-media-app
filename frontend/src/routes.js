import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import ChatRoom from './components/chat/ChatRoom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>
  );
}
