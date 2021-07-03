import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import edit from '../../../img/edit.png'
import s from './NewsArticle.module.css'
import requests from '../../../api/requests'

const Edit = ({loggedIn, loggedUser}) => {
    let history = useHistory()
    const { id } = useParams();

    const hiddenFileInput = useRef(null);

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

    const handlePhotoChange = (e) => {
        if (!e.target.files[0]) return
        setState({
            ...state,
            photo: URL.createObjectURL(e.target.files[0]),
            photoObject: e.target.files[0],
        })
    }

    const handlePhotoChangeClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click();
    }

    const finishContentChange = () => {
        setState({
            ...state,
            showEditContent: false
        })
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

    const [state, setState] = useState({
        id: null,
        title: '',
        content: null,
        photo: null,
        photoObject: null,
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
        }).catch(() => {
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
            <form className="row w-100 mx-0" encType="multipart/form-data" name="fileinfo">
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
                        onChange={handlePhotoChange} 
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