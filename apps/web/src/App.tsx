import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { Home } from './pages/Home';
import { Singleplayer } from './pages/Singleplayer';
import { Multiplayer } from './pages/Multiplayer';
import { CreateRoom } from './pages/CreateRoom';
import { Room } from './pages/Room';
import { Editor } from './pages/Editor';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VariantBrowser } from './pages/VariantBrowser';
import { VariantDetail } from './pages/VariantDetail';
import { AccountSettings } from './pages/AccountSettings';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { AuthBar } from './components/AuthBar';

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <AuthBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<VariantBrowser />} />
          <Route path="/variants/:id" element={<VariantDetail />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
