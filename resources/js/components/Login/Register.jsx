import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import requests from '../../api/requests'

const Register = () => {
    let history = useHistory()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([])

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
        requests.register(form)
        .then(() => {
          history.push('/login')
        })
        .catch(error => {
          if (error.response.status == 422) {
              setErrors(error.response.data.errors)
          }
      })
    }

    return (
      <div className="content-width mt main">
        <div className="col-md-5 mx-auto my-2">
          <h1 className="text-center">Register</h1>
          <form className="card bg-none border-none" onSubmit={register}>
            <div className="card-body">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name && "input-border-danger"}`}
                      id="name"
                      value={form.name}
                      onChange={handleNameChange}
                    />
                    {errors.name && <span className="text-danger" >
                        { errors.name[0] }
                    </span> }
                  </div>
                  <div className="form-group">
                    <label >Email address:</label>
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
                    <label >Password:</label>
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
                  <button
                    type="submit"
                    onClick={register}
                    className="btn btn-primary btn-block"
                  >
                    Register
                  </button>
                  <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Register