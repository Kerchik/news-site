import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../img/logo.png'
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={`content-width ${s.header}`}>
            <img src={logo} />
            <ul className={s.ul}>
                <li><Link to="/news">News</Link></li>
                <li><a href="#">Lorem</a></li>
            </ul>
        </div>
    )
}

export default Header