import React from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import Chat from './chat/Chat'
import Login from './login/Login'
import {useStateValue } from './StateProvider'
// import SpeechToText from './chat/SpeechToText';
function App() {
  const [{user} ,  ] =useStateValue();
  return (
    <div className="app">
      <Router>
      {!user ? (
        <Login />
      ) : (
            // <Sidebar />
            <Routes>
              <Rout
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
              {/* <Route path="/speech" element={<SpeechToText/>} /> */}
            </Routes>
      )}
        </Router>
    </div>
  );
}

export default App;