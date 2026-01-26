import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { Home } from './pages/Home';
import { Singleplayer } from './pages/Singleplayer';
import { Multiplayer } from './pages/Multiplayer';
import { CreateRoom } from './pages/CreateRoom';
import { Room } from './pages/Room';
import { Editor } from './pages/Editor';

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
