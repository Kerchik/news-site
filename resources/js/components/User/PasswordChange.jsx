import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import requests from '../../api/requests'

const PasswordChange = ({loggedIn, loggedUser, changeIsLoggedIn, changeLoggedUser}) => {
    let history = useHistory()
    const [userData, setUserData] = useState(null)
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        password: '',
        password_confirmation: ''
    })
    useEffect(() => {
        if (!loggedIn) {
            history.push('/')
            console.error('You are not logged in!')
            return
        }
        setUserData({
            ...loggedUser
        })
        
    }, [])

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setErrors([])
        setForm({
            ...form,
            password: e.target.value
        })
    }

    const handleConfirmPasswordChange = (e) => {
        e.preventDefault()
        setErrors([])
        setForm({
            ...form,
            password_confirmation: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        requests.changePassword(form, userData.id)
        .then(() => {
            requests.logout().then(() => {
                changeIsLoggedIn(false)
                changeLoggedUser(null)
                history.push('/login')
            })
        })
        .catch(error => {
            if (error.response.status == 422) {
            console.log(error.response.data.errors)
                setErrors(error.response.data.errors)
            }
        })
    }

    return (
        <div className={`content-width mt main p-4`}>
            <div className="col-md-5 mx-auto my-2">
                <h1 className="text-center">Change password</h1>
                <form className="card bg-none border-none" onSubmit={register}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >New password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && "input-border-danger"}`}
                                value={form.password}
                                onChange={handlePasswordChange}
                            />
                            {errors.password && <span className="text-danger">
                                { errors.password[0] }
                            </span> }
                        </div>
                        <div className="form-group">
                            <label >Confirm password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && "input-border-danger"}`}
                                value={form.password_confirmation}
                                onChange={handleConfirmPasswordChange}
                            />
                            {errors.password && <span className="text-danger">
                                { errors.password[0] }
                            </span> }
                        </div>
                        <button
                        type="button"
                            onClick={register}
                            className="btn btn-primary btn-block"
                        >
                            Change password
                        </button>
                        <Link to="/profile">Back to profile</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordChange