import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Register = () => {

    const [message, setMessage] = useState({
        type: "invisible",
        text: "Dummy"
    })


    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    function handelInput(e) {
        // console.log(e.target.name,e.target.value);
        setUserDetails((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userDetails);


        fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                // setMessage({ type: "success", text: data.message })
                setUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    age: ""
                })

                setTimeout(() => {
                    setMessage({ type: "invisible", text: "dummy" })
                }, 5000)


            })
            .catch((err) => {
                console.log(err);
            })


    }

    return (
        <section className='container cred-container mode'>
            <form action="" className='form' onSubmit={handleSubmit}>
                <h1 className='register-heading'> Track Your Diet</h1>
                <input type="text" name='name' placeholder='Enter Name here' required className='inp' onChange={handelInput} value={userDetails.name} />
                <input type="eamil" name='email' placeholder='Enter Email here' required className='inp' onChange={handelInput} value={userDetails.email} />
                <input type="password" name='password' placeholder='Enter Passwod here' maxLength={8} required className='inp' onChange={handelInput} value={userDetails.password} />
                <input type="number" name='age' placeholder='Enter Age here' min={12} max={100} className='inp' required onChange={handelInput} value={userDetails.age} />
                <button className='btn mode' type='submit'>Register</button>
                <p>Already Registered?   <Link to='/login' className='links'>Login</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}
