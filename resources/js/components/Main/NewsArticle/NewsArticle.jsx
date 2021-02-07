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

    const editContent = () => {
        setState({
            ...state,
            showEditContent: true
        })
    }

    const handleTitleChange = (event) => {
        setState({
            ...state,
            title: event.target.value
        })
    }

    const handleContentChange = (event) => {
        setState({
            ...state,
            content: event.target.value
        })
    }

    const finishTitleChange = () => {
        setState({
            ...state,
            showEditTitle: false
        })
    }

    const finishContentChange = () => {
        setState({
            ...state,
            showEditContent: false
        })
    }

    const saveChanges = () => {
        fetch(`/api/news/${id}`, { method: 'POST', body: JSON.stringify(state) })
        .then(response => {
            console.log(response)
        })
    }

    const [state, setState] = useState({
        id: null,
        title: 'null',
        content: null,
        photo: null,
        showEditTitle: false,
        showEditContent: false,
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
                {state.showEditTitle && <input className={s['title-input']} value={state.title} onChange={handleTitleChange} onBlur={finishTitleChange} />}
                { state.showEditContent || <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div> }
                { state.showEditContent || <div className="col-12 w-100 my-2">
                    <button onClick={editContent} className={`btn btn-primary ${s['edit-content-button']}`}>Edit</button>
                </div> }
                {state.showEditContent && <input className={s['title-input']} value={state.content} onChange={handleContentChange} onBlur={finishContentChange} />}
                <div className="col-12">
                    <button onClick={saveChanges} className="btn btn-success">Save</button>
                </div>
            </div>
        </div>
    )
}

export default NewsArticle