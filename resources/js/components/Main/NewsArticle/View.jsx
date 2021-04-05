import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import s from './NewsArticle.module.css'

const View = (props) => {
    const { id } = useParams();

    const [state, setState] = useState({
        id: null,
        title: '',
        content: null,
        photo: null,
        author: null,
    })

    useEffect(() => {
        fetch(`/api/news/${id}`)
        .then(response => {
            return response.json();
        })
        .then(news => {
            setState({
                ...state,
                id: news.id,
                title: news.title,
                content: news.content,
                photo: news.photo,
                author: news.author,
            })
        });
    }, [])

    return (
        <div className={`content-width mt ${s.main}`}>
            <div className="row">
                <img src={state.photo} className="col-12" />
                <div className={`col-12 d-flex justify-content-end ${s.author}`}>Author: <b>{state?.author?.name}</b></div>
                <span className={`col-12 ${s.title}`}>
                    {state.title}
                </span> 
                <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div>
            </div>
        </div>
    )
}

export default View