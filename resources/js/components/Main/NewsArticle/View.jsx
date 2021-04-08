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
            content: state.comment,
            author: loggedUser.id,
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
            <div className="row w-100 ml-0">
                <div className="col-12">
                    <div className={`justify-content-center mt-5 border-left border-right`}>
                         {comments.length > 0 
                                ? comments.map(comment => (
                                    <div className="d-flex justify-content-center py-2">
                                        <div className={`${s.second} py-2 px-2`}> <span className={s.text1}>{comment.content}</span>
                                            <div className="d-flex justify-content-between py-1 pt-2">
                                                <div><span className={s.text2}>{comment.author.name}</span></div>
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
                            <input value={state.comment} onChange={commentHandler} className="w-100" type="text" placeholder="Leave your comment..." />
                            <button onClick={addComment} type="button" className="btn btn-success my-2 w-100">Add comment</button>
                        </>
                    : 
                        <div className="w-100">Please <Link to="/login">login</Link> to leave the comment</div>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default View