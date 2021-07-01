import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import s from './AddNews.module.css'
import requests from '../../../api/requests'

const AddNews = ({loggedIn, loggedUser}) => {
    let history = useHistory()

    const [state, setState] = useState({
        title: "",
        content: "",
        photo: ""
    })

    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!loggedIn || (loggedUser && loggedUser.role!=1)) {
            history.push('/')
            return
        }
    },[])

    const setTitle = (event) => {
        setState({
            ...state,
            title: event.target.value
        })
    }

    const setContent = (event) => {
        setState({
            ...state,
            content: event.target.value
        })
    }

    const setPhoto = (event) => {
        setState({
            ...state,
            photo: event.target.files[0]
        })
    }

    const addNews = (e) => {
        e.preventDefault()
        var form = document.forms.namedItem("fileinfo")
        const formData = new FormData(form);
        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("photo", state.photo);
        requests.addArticle(formData)
        .then(() => {
            history.push('/')
        })
        .catch(error => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors)
            }
        })
    }

    return (
        <div className={`content-width row mx-auto mt ${s['add-news']}`}>
            <form className="col-12 my-2" encType="multipart/form-data" name="fileinfo">
                <input 
                    type="text" 
                    className={`form-control w-100 my-1 ${errors.title && "input-border-danger"}`}
                    placeholder="Title" 
                    value={state.title}
                    onChange={setTitle}
                />
                {errors.title && <span className="text-danger" >
                    { errors.title[0] }
                </span> }
                <textarea 
                    className={`form-control w-100 my-1 ${errors.content && "input-border-danger"}`}
                    placeholder="Content"
                    value={state.content}
                    onChange={setContent}
                />
                {errors.content && <span className="text-danger" >
                    { errors.content[0] }
                </span> }
                <input 
                    type="file" 
                    className={`w-100 my-1 ${errors.photo && "input-border-danger"}`} 
                    placeholder="Photo"
                    onChange={setPhoto} 
                />
                {errors.photo && <span className="text-danger" >
                    { errors.photo[0] }
                </span> }
                <button onClick={addNews} className="btn btn-success w-100 my-1">Add</button>
            </form>
        </div>
    )
}

AddNews.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default AddNews