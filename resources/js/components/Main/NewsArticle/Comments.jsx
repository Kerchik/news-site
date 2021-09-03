import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import requests  from '../../../api/requests'
import defaultAvatar from '../../../img/user_default_avatar.png'
import s from './NewsArticle.module.css'

const Comments = ({loggedIn, newsState}) => {
    const [comments, setComments] = useState([])
    const [commentValue, setCommentValue] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (newsState.id) {
            getComments(newsState.id)
        }
    }, [newsState])
    
    const getComments = async (id) => {
        requests.getComments(id).then(({data}) => {
            setComments(data)
        })
    }
    const commentHandler = (e) => {
        setCommentValue(e.target.value)
    }
    const addComment = () => {
        let data = {
            content: commentValue,
            news_id: newsState.id
        }
        requests.addComment(data, newsState.id).then(() => {
            setCommentValue('')
            getComments(newsState.id)
        })
        .catch(error => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors)
            }
        })
    }

    return (
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
                                                <img
                                                    src={comment?.author?.avatar || defaultAvatar}
                                                    alt="avatar"
                                                    width="25"
                                                    height="25"
                                                />
                                                <span className={s.text2}>{comment?.author?.name || 'DELETED'}
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
                            value={commentValue} 
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
                            disabled={!commentValue}
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
    )
}

Comments.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    newsState: PropTypes.object,
}

export default Comments