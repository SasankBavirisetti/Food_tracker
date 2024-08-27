import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate()

    const loggedData=useContext(UserContext)
    function logout()
    {
        localStorage.removeItem("food-tracker-user");
        loggedData.setLoggedUser(null);
        navigate("/login")

    }



    return (
      <div className='header'>
        <h2 className='header-name'>{loggedData.loggedUser.name}</h2>

              <ul className='header-links'>
                  <Link to="/track"><li>Track</li></Link>
                  <Link to="/diet"><li>Diet</li></Link>
                  <li onClick={logout}>Logout</li>
              </ul>


      </div>
  )
}
