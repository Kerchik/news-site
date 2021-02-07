import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import s from './NewsArticle.module.css'

const NewsArticle = (props) => {
    const { id } = useParams();

    const editTitle = () => {
        setState({
            ...state,
            showEditTitle: true
        })
    }

    const handleTitleChange = (event) => {
        setState({
            ...state,
            title: event.target.value
        })
    }

    const finishTitleChange = (event) => {
        setState({
            ...state,
            showEditTitle: false
        })
    }

    const [state, setState] = useState({
        id: null,
        title: 'null',
        content: null,
        photo: null,
        showEditTitle: false
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
            })
        });
    }, [])

    return (
        <div className={`content-width mt ${s.main}`}>
            <div className="row">
                <img src={state.photo} className="col-12" />
                { state.showEditTitle || <span className={`col-12 ${s.title}`}>
                    {state.title}
                    <button onClick={editTitle} className={`btn btn-primary ${s['edit-button']}`}>Edit</button>
                </span> }
                {state.showEditTitle && <input className="col-12" value={state.title} onChange={handleTitleChange} onBlur={finishTitleChange} />}
                <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div>
            </div>
        </div>
    )
}

export default NewsArticle