import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../img/logo.png'
import s from './Header.module.css'
import axios from 'axios' 
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory()
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
        <div className={`content-width ${s.header}`}>
            <img src={logo} />
            <ul className={s.ul}>
                <li><Link to="/news">News</Link></li>
                <li><a href="/about">About</a></li>
                <li><a onClick={logout} href="#">Logout</a></li>
            </ul>
        </div>
    )
}

export default Header