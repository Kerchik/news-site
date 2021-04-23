import React from 'react'
import logo from '../../img/logo.png'
import scrollUp from '../../img/scroll-up.png'
import s from './Footer.module.css'

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div className={`d-flex content-width text-white justify-content-between pb-2 ${s['footer']}`}>
            <div>
                <img src={logo} />
            </div>
            <div>
                <img 
                    src={scrollUp} 
                    className={s['scroll-up']}
                    onClick={scrollTop}    
                />
            </div>
        </div>
    )
}

export default Footer;