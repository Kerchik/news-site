import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import requests from '../../../api/requests'
import s from './NewsArticle.module.css'

const View = ({loggedIn, loggedUser}) => {
    const { id } = useParams();

    const [state, setState] = useState({
        id: null,
        title: '',
        content: null,
        photo: null,
        author: null,
        comment: ''
    })

    const [comments, setComments] = useState([])

    const [errors, setErrors] = useState([])

    const commentHandler = (e) => {
        setState({
            ...state,
            comment: e.target.value
        })
    }

    const getComments = async () => {
        requests.getComments(id).then(({data}) => {
            setComments(data)
        })
    }

    const addComment = () => {
        let data = {
            content: state.comment,
            author: loggedUser.id,
            news_id: state.id
        }
        requests.addComment(data).then(response => {
            setState({...state, comment: ''})
            getComments()
        })
        .catch(error => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors)
            }
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
        getComments()
           
    }, [])

    return (
        <div className={`content-width mt ${s.main}`}>
            <div className="row w-100 mx-0">
                <img src={state.photo} className="col-12 px-0" />
                <div className={`col-12 d-flex justify-content-end ${s.author}`}>
                    Author: <b>{state?.author?.name}</b>
                </div>
                <span className={`col-12 ${s.title}`}>
                    {state.title}
                </span> 
                <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div>
            </div>
            <div className="row w-100 ml-0">
                <div className="col-12">
                    <div className={`justify-content-center mt-5 border-left border-right`}>
                         {comments.length > 0 
                                ? comments.map(comment => (
                                    <div className="d-flex justify-content-center py-2" key={comment.id}>
                                        <div className={`${s.second} py-2 px-2`}>
                                            <span className={s.text1}>
                                                {comment.content}
                                            </span>
                                            <div className="d-flex justify-content-between py-1 pt-2">
                                                <div>
                                                    <span className={s.text2}>{comment.author.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="d-flex justify-content-center py-2">
                                    <div className={`${s.second} py-2 px-2`}>
                                        No comments
                                    </div>
                                </div>
                            }
                    </div>
                    { 
                    loggedIn 
                    ?
                        <>
                            <input 
                                value={state.comment} 
                                onChange={commentHandler} 
                                className={`form-control ${errors.content && "input-border-danger"}`} 
                                type="text" 
                                placeholder="Leave your comment..." 
                            />
                            {errors.content && <span className="text-danger" >
                                { errors.content[0] }
                            </span> }
                            <button 
                                onClick={addComment} 
                                type="button" 
                                className="btn btn-success my-2 w-100"
                                disabled={!state.comment}
                            >
                                Add comment
                            </button>
                        </>
                    : 
                        <div className="w-100">
                            Please <Link to="/login">login</Link> to leave the comment
                        </div>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default View