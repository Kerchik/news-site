import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleNameChange = (e) => {
        setForm({
            ...form,
            name: e.target.value
        })
    }

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

    const register = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/register', form)
        })
    }

    return (
      <div className="content-width mt main">
        <div className="col-md-5 mx-auto my-2">
          <h1 className="text-center">Register</h1>
          <div className="card bg-none border-none">
            <div className="card-body">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={form.name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label >Email address:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={form.email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label >Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={form.password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={register}
                    className="btn btn-primary btn-block"
                  >
                    Register
                  </button>
                  <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register