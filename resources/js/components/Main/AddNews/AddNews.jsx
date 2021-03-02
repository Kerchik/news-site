import React, {useState} from 'react'
import s from './AddNews.module.css'

const AddNews = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        photo: ""
    })

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
            photo: event.target.value
        })
    }

    const addNews = () => {
        fetch(`/api/add-news`, { method: 'POST', body: JSON.stringify(state) })
        .then(response => {
            console.log(response)
        })
    }

    return (
        <div className={`content-width row mx-auto mt ${s['add-news']}`}>
            <div className="col-12 my-2">
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
                    type="text" 
                    className="w-100 my-1" 
                    placeholder="Photo"
                    value={state.photo}
                    onChange={setPhoto} 
                />
                <button onClick={addNews} className="btn btn-success w-100 my-1">Add</button>
            </div>
        </div>
    )
}

export default AddNews