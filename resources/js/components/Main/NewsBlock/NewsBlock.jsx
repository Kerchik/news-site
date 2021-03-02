import React from 'react'
import {Link} from 'react-router-dom'
import s from './NewsBlock.module.css'

const NewsBlock = ({props}) => {
    return (
        <Link className="col-lg-6" to={`/news/${props.id}`}>
            <div className={s['news-block']}>
                <img src={props.photo} className={s['news-block-photo']}/>
                <div>
                    <span className={s['news-block-title']}>{props.title}</span>
                </div>
            </div>
        </Link>
    )
}

export default NewsBlock