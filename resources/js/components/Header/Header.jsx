import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import logo from '../../img/logo.png'
import s from './Header.module.scss'
import requests from '../../api/requests'
import { useHistory } from 'react-router-dom'

const Header = ({loggedIn, changeIsLoggedIn, changeLoggedUser, loggedUser}) => {
    let history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    const toggleHeaderMenu = () => {
        setShowMenu(!showMenu)
    }

    const goToHomePage = () => {
        history.push('/')
    }

    const goToPage = (page) => {
        history.push(page)
        setShowMenu(false)
    }

    const toUserProfile = () => {
        history.push(`/profile`)
    }

    const logout = (e) => {
        e.preventDefault()
        requests.logout().then(() => {
            changeIsLoggedIn(false)
            changeLoggedUser(null)
            history.go(0)
        })
    }
    return (
        <div className="d-flex content-width justify-content-between">
            <div className={` ${s.header}`}>
                <img 
                    src={logo}
                    className={'cursor-pointer'} 
                    onClick={goToHomePage} />
                <ul className={`${s.ul}  ${s['navbar-hide']}`}>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/about">About</Link></li>
                    { (loggedIn && loggedUser?.role === 1) &&
                        <li><Link to="/admin-page">Admin Page</Link></li>                   
                    }
                </ul>
            </div>
            <button onClick={toggleHeaderMenu} className={`navbar-toggler navbar-dark ${s['navbar-toggle-button']}`} type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`demo-menu ${showMenu && 'visible'}`}>
                <ul className={`${s['dropdown-menu-ul']} text-center pl-0`}>
                    <li><a onClick={() => goToPage("/news")}>News</a></li>
                    <li><a onClick={() => goToPage("/about")}>About</a></li>
                    { (loggedIn && loggedUser?.role === 1) &&
                        <li><a onClick={() => goToPage("/admin-page")}>Admin Page</a></li>                   
                    }
                    { loggedIn ?
                        <li>
                            <span onClick={toUserProfile} className="cursor-pointer text-light mr-2">{loggedUser?.name}</span>
                            <a onClick={logout} href="#" className="d-inline">Logout</a>
                        </li>
                    :
                        <li>
                            <a className="link" onClick={() => goToPage("/login")}>Login</a>
                        </li>
                    }
                </ul>
            </div>
            <div className={`${s['header-mt']} ${s['navbar-hide']} ${s['navbar-header-margin']}`}>
                
                { loggedIn ?
                <>
                    <span onClick={toUserProfile} className="cursor-pointer text-light mr-2">{loggedUser?.name}</span>
                    <a className={`text-white ${s['login-logout']}`} onClick={logout} href="#">Logout</a>
                </>
                :
                <Link to="/login" className={`text-white ${s['login']} ${s['login-logout']}`}>Login</Link> 
                }
            </div>
        </div>
    )
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    changeIsLoggedIn: PropTypes.func.isRequired,
    changeLoggedUser: PropTypes.func.isRequired,
    loggedUser: PropTypes.object,
}

export default Header