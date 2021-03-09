import React from 'react'
import loading from './loading.gif'
import s from './Loading.module.css'

const Loading = () => {
    return (
        <img src={loading} className={s.loading}/>
    )
}

export default Loading