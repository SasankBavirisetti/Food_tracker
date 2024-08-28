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

  const [mode,setMode] = useState("Dark")

  
  // const setLightMode = () =>
  // {
  //   const elements = document.querySelectorAll('.mode');
  //   elements.forEach(element => {
  //     // Check if the data-theme attribute is set to 'dark'
  //     if (element.getAttribute('data-theme') === 'dark') {
  //       // Update the data-theme attribute to 'light'
  //       element.setAttribute('data-theme', 'light');
  //     }
  //   });
  // }
  // const setDarkMode = () =>
  // {
  //   let modeArr = Array.from(document.querySelector(".mode"))
  //   modeArr.map((ele)=>
  //   {
  //     return ele.setAttribute("data-theme","dark")
  //   })
  // }

  function toggleMode() {
    const elements = document.querySelectorAll('.mode');
  
    elements.forEach(element => {
      const currentTheme = element.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      element.setAttribute('data-theme', newTheme);
    });
  }

  // useEffect(()=>{
  //   setLightMode();
  // })

  function changeText()
  {
    if(mode==="Dark")
      {
        setMode("Light")
      }
      else if(mode==="Light")
      {
        setMode("Dark")
      }
    
  }

  
  return (
    <div className="App">

      <button className='theme' onClick={()=>
        {
          changeText();
          toggleMode();
        }
      }>{mode}</button>


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
