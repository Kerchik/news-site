import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import requests from '../../../api/requests'
import s from './NewsArticle.module.css'

const View = (props) => {
    const { id } = useParams();

    const [state, setState] = useState({
        id: null,
        title: '',
        content: null,
        photo: null,
        author: null,
        comment: ''
    })
    const initialValue = []
    const [comments, setComments] = useState(initialValue)

    const commentHandler = (e) => {
        setState({
            ...state,
            comment: e.target.value
        })
    }

    const addComment = () => {
        let data = {
            content: state.content,
            author: state.author.id,
            news_id: state.id
        }
        requests.addComment(data).then(response => {
            console.log(response)
        })
    }

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
        requests.getComments(id).then(({data}) => {
            setComments(data)
        })
           
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
            <div className="row">
                <div className="col-12">
                    {comments.length > 0 
                        && comments.map(comment => (
                            <div key={comment.id}>
                                <span>{comment.author.name}</span>
                                <span>{comment.content}</span>
                            </div>
                        ))}
                </div>
                <input value={state.comment} onChange={commentHandler} className="col-12 m-15" type="text" />
                <button onClick={addComment} type="button" className="btn btn-success m-15">Add comment</button>
            </div>
        </div>
    )
}

export default View