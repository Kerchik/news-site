import React, {useEffect, useRef, useReducer} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import edit from '../../../img/edit.png'
import s from './NewsArticle.module.css'
import requests from '../../../api/requests'

const initialState = {
    id: null,
    title: '',
    content: null,
    photo: null,
    photoObject: null,
    showEditTitle: false,
    showEditContent: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set-state':
            return {
                ...state,
                id: action.news.id,
                title: action.news.title,
                content: action.news.content,
                photo: action.news.photo,
            }
        case 'edit-title':
            return {...state, showEditTitle: true}
        case 'edit-content':
            return {...state, showEditContent: true}
        case 'handle-title-change':
            return {...state, title: action.title}
        case 'handle-content-change':
            return {...state, content: action.content}
        case 'finish-title-change':
            return {...state, showEditTitle: false}
        case 'finish-content-change':
            return {...state, showEditContent: false}
        case 'handle-photo-change':
            return {
                ...state,
                photo: URL.createObjectURL(action.files),
                photoObject: action.files,
            }
        default: return state 
    }
}

const Edit = ({loggedIn, loggedUser}) => {
    let history = useHistory()

    const { id } = useParams();

    const [state, dispatch] = useReducer(reducer, initialState)

    const hiddenFileInput = useRef(null);

    const titleInput = useRef(null);

    const contentInput = useRef(null);

    const handleResponse = (response) => {
        return response.json()
            .then((json) => {
                if (!response.ok) {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText,
                    });
                    
                    return Promise.reject(error);
                }
                return json;
            });
    }

    useEffect(() => {
        if (!loggedIn || (loggedUser && loggedUser.role!=1)) {
            history.push('/')
            return
        }
        fetch(`/api/news/${id}`)
        .then(handleResponse)
        .then(news => {
            dispatch({type: 'set-state', news})
        }).catch((error) => {
            if (error?.status === 404) {
                console.error(error.message)
                history.push('/')
                return
            }
        })
    }, [])

    useEffect(() => {
        if (state.showEditTitle) titleInput.current.focus()
        if (state.showEditContent) contentInput.current.focus()
    }, [state.showEditTitle, state.showEditContent])

    const handlePhotoChangeClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click();
    }

    const saveChanges = (e) => {
        e.preventDefault()
        var form = document.forms.namedItem("fileinfo")
        const formData = new FormData(form);
        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("photo", state.photoObject);
        requests.editArticle(formData, id)
        .then(() => {
            history.push('/')
        })
    }

    return (
        <div className={`content-width mt ${s.main}`}>
            <form className="row w-100 mx-0" encType="multipart/form-data" name="fileinfo">
                <img src={state.photo} className="col-12 px-0" />
                { state.showEditTitle || 
                    <span className={`col-12 ${s.title}`}>
                        {state.title}
                        <img 
                            onClick={() => dispatch({type: 'edit-title'})} 
                            src={edit} 
                            className={s['edit-button']}
                        />
                    </span> 
                }
                {state.showEditTitle && 
                    <input 
                        className={s['title-input']} 
                        value={state.title} 
                        onChange={(e) => dispatch({type: 'handle-title-change', title: e.target.value})} 
                        ref={titleInput} 
                        onBlur={() => dispatch({type: 'finish-title-change'})} 
                    />}
                { state.showEditContent || 
                    <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div> }
                { state.showEditContent || 
                    <div className="col-12 w-100 my-2">
                        <img 
                            onClick={() => dispatch({type: 'edit-content'})} 
                            src={edit} 
                            className={s['edit-button']}
                        />
                    </div> 
                }
                {state.showEditContent && 
                    <textarea 
                        className={s['title-input']} 
                        value={state.content} 
                        onChange={(e) => dispatch({type: 'handle-content-change', content: e.target.value})} 
                        onBlur={() => dispatch({type: 'finish-content-change'})} 
                        ref={contentInput} 
                    />}
                <div className={`col-12 mb-2 d-flex flex-wrap justify-content-end ${s['action-buttons']}`}>
                    <button 
                        className="btn btn-primary mr-2"
                        onClick={handlePhotoChangeClick}
                    >
                        Change photo
                    </button>
                    <input
                        type="file"
                        className="d-none"
                        ref={hiddenFileInput}
                        onChange={(e) => {
                            if (!e.target.files[0]) return
                            dispatch({type: 'handle-photo-change', files: e.target.files[0]})
                        }} 
                    />
                    <button 
                        onClick={saveChanges} 
                        className={`btn btn-success ${s['save-button']}`}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

Edit.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default Edit