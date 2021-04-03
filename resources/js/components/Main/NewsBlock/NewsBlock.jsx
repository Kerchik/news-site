import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import remove from '../../../img/remove.png'
import edit from '../../../img/edit.png'
import s from './NewsBlock.module.css'

const NewsBlock = ({props, isUser}) => {
    const removeArticle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.delete(`/api/news/remove/${props.id}`).then(() => {
                console.log()
            })
        })
    }
    return (
            <div className={s['news-block'] + " col-lg-6"}>
                <Link  to={`/news/${props.id}`}>
                <img src={props.photo} className={s['news-block-photo']}/>
                <div>
                    <span className={s['news-block-title']}>{props.title}</span>
                </div>
                {isUser &&
                <div className={s['news-button-container']}>
                    <Link  to={`/news/edit/${props.id}`}>
                        <img className="pr-1" src={edit} />
                    </Link>
                    <img src={remove} onClick={removeArticle} />
                </div>
                }
                </Link>
            </div>
    )
}

export default NewsBlock