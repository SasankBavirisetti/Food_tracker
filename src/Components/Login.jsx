import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';

export const Login = () => {

    const loggedData = useContext(UserContext)

    let navigate = useNavigate();

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: "",
    })


    const [message, setMessage] = useState({
        type: "invisible",
        text: "Dummy"
    })

    function handelInput(e) {
        // console.log(e.target.name,e.target.value);
        setUserCreds((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(userCreds);


        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then((response) => {
                // console.log(response);
                if (response.status === 404) {
                    setMessage({ type: "error", text: "User Not Found" })
                } else if (response.status === 403) {
                    setMessage({ type: "error", text: "Incorrect Password" })
                } else if (response.status === 200) {
                    setMessage({ type: "success", text: "Login Success" })
                }
                setTimeout(() => {
                    setMessage({ type: "invisible", text: "dummy" })
                }, 5000)
                return response.json();

            })
            .then((data) => {
                console.log(data)
                if (data.token !== undefined) {
                    localStorage.setItem("food-tracker-user", JSON.stringify(data));
                    loggedData.setLoggedUser(data);
                    navigate("/track");
                }
            })
            .catch((err) => {
                console.log(err);
            })


    }


    return (
        <section className='container cred-container'>
            <form action="" className='form' onSubmit={handleSubmit}>
                <h1 className='register-heading'> Login Here</h1>
                <input type="eamil" name='email' placeholder='Enter Email here' className='inp' onChange={handelInput} value={userCreds.email} />
                <input type="password" name='password' placeholder='Enter Passwod here' className='inp' onChange={handelInput} value={userCreds.password} />
                <button className='btn' type='submit'>Login</button>
                <p>Don't have an account?   <Link to='/register'>Register</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}
