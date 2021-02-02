import React from 'react'
import '../../App.css'
import s from './NewsBlock.module.css'

const NewsBlock = ({props}) => {
    return (
        <div className={s['news-block']}>
            <img src={props.photo} className={s['news-block-photo']}/>
            <div>
                <span className={s['news-block-title']}>{props.title}</span>
            </div>
        </div>
    )
}

export default NewsBlock