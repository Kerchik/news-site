import React from 'react'
import logo from '../../img/logo.png'
import scrollUp from '../../img/scroll-up.png'
import s from './Footer.module.css'

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <footer className={`d-flex content-width text-white justify-content-between pb-2 mt-1 ${s['footer']}`}>
            <div>
                <img 
                    src={logo} 
                    className={s['footer-logo']}
                />
            </div>
            <div>
                <img 
                    src={scrollUp} 
                    className={s['scroll-up']}
                    onClick={scrollTop}    
                />
            </div>
        </footer>
    )
}

export default Footer;