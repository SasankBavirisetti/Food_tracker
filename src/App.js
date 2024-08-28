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


function App() {


  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("food-tracker-user")))


  const [theme, setTheme] = useState('light');

  const themeVariable = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  

  return (
    <div className="App">

      <button className='theme' onClick={toggleTheme}>{themeVariable}</button>


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
