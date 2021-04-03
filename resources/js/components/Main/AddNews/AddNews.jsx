import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import s from './AddNews.module.css'

const AddNews = ({loggedIn}) => {
    let history = useHistory()
    const [state, setState] = useState({
        title: "",
        content: "",
        photo: ""
    })

    useEffect(() => {
        if (!loggedIn) {
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
        fetch(`/api/add-news`, { method: 'POST', body: formData })
        .then(response => {
            console.log(response)
        })
    }

    return (
        <div className={`content-width row mx-auto mt ${s['add-news']}`}>
            <form className="col-12 my-2" encType="multipart/form-data" name="fileinfo">
                <input 
                    type="text" 
                    className="w-100 my-1" 
                    placeholder="Title" 
                    value={state.title}
                    onChange={setTitle}
                />
                <textarea 
                    className="w-100 my-1" 
                    placeholder="Content"
                    value={state.content}
                    onChange={setContent}
                />
                <input 
                    type="file" 
                    className="w-100 my-1" 
                    placeholder="Photo"
                    onChange={setPhoto} 
                />
                <button onClick={addNews} className="btn btn-success w-100 my-1">Add</button>
            </form>
        </div>
    )
}

export default AddNews