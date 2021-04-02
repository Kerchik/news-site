import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../img/logo.png'
import s from './Header.module.css'
import axios from 'axios' 
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory()
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.get('/api/user').then(({data}) => {
            setUser(data.name)
        })
    }, [])
    const logout = (e) => {
        e.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/logout').then(() => {
                localStorage.removeItem("auth")
                history.go(0)
            })
        })
    }
    return (
        <div className="d-flex content-width justify-content-between">
        <div className={` ${s.header}`}>
            <img src={logo} />
            <ul className={s.ul}>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>
        <div>
            { user ?
            <a className="text-white login-logout" onClick={logout} href="#">Logout</a>
            :
            <Link to="/login" className="text-white login-logout">Login</Link> 
            }
        </div>
        </div>
    )
}

export default Header