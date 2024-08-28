import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
    return (
        <section className='container nf mode'>
            <div className='NotFoundPage'>
                <h1>404 |  Page Not Found</h1>
                <p className='register-suggestion'><Link to='/register'>Register</Link> Now to Use</p>
            </div>
        </section>

    )
}
