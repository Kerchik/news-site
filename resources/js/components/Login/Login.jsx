import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {
    let history = useHistory()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

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
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/login', form).then(() => {
                localStorage.setItem("auth", "true")
                history.push('/')
            })
        })
    }

    return (
        <div className="home col-5 mx-auto py-5 mt-5">
            <h1 className="text-center">Login</h1>
            <div className="card">
            <div className="card-body">
                <div className="form-group">
                <label>Email address:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={form.email}
                    onChange={handleEmailChange}
                />
                </div>
                <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={handlePasswordChange}
                />
                </div>
                <button onClick={login} className="btn btn-primary btn-block">
                    Login
                </button>
            </div>
            </div>
        </div>
    )
}

export default Login