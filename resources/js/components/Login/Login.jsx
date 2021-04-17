import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import requests from '../../api/requests'

const Login = ({changeIsLoggedIn, changeLoggedUser}) => {
    let history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([])

    const handleEmailChange = (e) => {
        setForm({
            ...form,
            email: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setForm({
            ...form,
            password: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        requests.login(form).then(({data}) => {
            changeLoggedUser(data)
            changeIsLoggedIn(true)
            history.push('/')
        })
        .catch(error => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors)
            }
        })
    }

    return (
        <div className={`content-width mt main`}>
            <div className="col-md-5 mx-auto my-2">
                <h1 className="text-center">Login</h1>
                <div className="card bg-none border-none">
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email address:</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email && "input-border-danger"}`}
                                id="email"
                                value={form.email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && <span className="text-danger" >
                                { errors.email[0] }
                            </span> }
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && "input-border-danger"}`}
                                id="password"
                                value={form.password}
                                onChange={handlePasswordChange}
                            />
                            {errors.password && <span className="text-danger" >
                                { errors.password[0] }
                            </span> }
                        </div>
                        <button onClick={login} className="btn btn-primary btn-block">
                            Login
                        </button>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login