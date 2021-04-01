import React, {useState} from 'react'
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
        <div className="home col-5 mx-auto py-5 mt-5">
        <h1 className="text-center">Register</h1>
        <div className="card">
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
              {/* <span class="text-danger" v-if="errors.name">
                {{ errors.name[0] }}
              </span> */}
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
              {/* <span class="text-danger" v-if="errors.email">
                {{ errors.email[0] }}
              </span> */}
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
              {/* <span class="text-danger" v-if="errors.password">
                {{ errors.password[0] }}
              </span> */}
            </div>
            <button
              type="submit"
              onClick={register}
              className="btn btn-primary btn-block"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )
}

export default Register