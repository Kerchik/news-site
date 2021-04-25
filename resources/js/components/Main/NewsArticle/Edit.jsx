import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import edit from '../../../img/edit.png'
import s from './NewsArticle.module.css'
import requests from '../../../api/requests'

const Edit = ({loggedIn, loggedUser}) => {
    let history = useHistory()
    const { id } = useParams();

    const titleInput = useRef(null);

    const contentInput = useRef(null);

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
        requests.editArticle(state, id)
        .then(response => {
            history.push('/')
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
        if (!loggedIn || (loggedUser && loggedUser.role!=1)) {
            history.push('/')
            return
        }
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
        }).catch(error => {
            history.push('/')
            return
        })
    }, [])

    useEffect(() => {
        if (state.showEditTitle) titleInput.current.focus()
        if (state.showEditContent) contentInput.current.focus()
    }, [state.showEditTitle, state.showEditContent])

    return (
        <div className={`content-width mt ${s.main}`}>
            <div className="row w-100 mx-0">
                <img src={state.photo} className="col-12 px-0" />
                { state.showEditTitle || 
                    <span className={`col-12 ${s.title}`}>
                        {state.title}
                        <img 
                            onClick={editTitle} 
                            src={edit} 
                            className={s['edit-button']}
                        />
                    </span> 
                }
                {state.showEditTitle && 
                    <input 
                        className={s['title-input']} 
                        value={state.title} 
                        onChange={handleTitleChange} 
                        ref={titleInput} 
                        onBlur={finishTitleChange} 
                    />}
                { state.showEditContent || 
                    <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div> }
                { state.showEditContent || 
                    <div className="col-12 w-100 my-2">
                        <img 
                            onClick={editContent} 
                            src={edit} 
                            className={s['edit-button']}
                        />
                    </div> 
                }
                {state.showEditContent && 
                    <textarea 
                        className={s['title-input']} 
                        value={state.content} 
                        onChange={handleContentChange} 
                        onBlur={finishContentChange} 
                        ref={contentInput} 
                    />}
                <div className="col-12 mb-2 d-flex justify-content-end">
                    <button 
                        onClick={saveChanges} 
                        className={`btn btn-success ${s['save-button']}`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Edit