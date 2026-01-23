import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Singleplayer } from './pages/Singleplayer';
import { Multiplayer } from './pages/Multiplayer';
import { Room } from './pages/Room';
import { Editor } from './pages/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleplayer" element={<Singleplayer />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
