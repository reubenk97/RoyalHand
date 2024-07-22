import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CreateLobby from './views/CreateLobby';
import JoinLobby from './views/JoinLobby';
import Lobby from './views/Lobby';
import GameBoard from './views/GameBoard';
import cardsBack from './assets/cards-background.jpg';

function App() {
  const [backImage, setBackImage] = useState(cardsBack);

  return (
    <div className='app' style={{backgroundImage: `url(${backImage})`}}>
      <Routes>
        <Route path='/' element={<Home setBackImage={setBackImage}/>} />
        <Route path='/create' element={<CreateLobby />} />
        <Route path='/join' element={<JoinLobby />} />
        <Route path='/lobbies/:id' element={<Lobby />} />
        <Route path='/lobbies/:id/play' element={<GameBoard setBackImage={setBackImage} />} />
      </Routes>
    </div>
  );
}

export default App;