import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { NotFoundPage } from './Components/NotFoundPage';
import { Track } from './Components/Track';



import { UserContext } from './contexts/UserContext';
import { useEffect, useState } from 'react';
import { Private } from './Components/Private';
import { Diet } from './Components/Diet';
import { Header } from './Components/Header';


function App() {


  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("food-tracker-user")))

  
  return (
    <div className="App">


      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/track' element={<Private Component={Track} />} />
            <Route path='/Diet' element={<Private Component={Diet} />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
