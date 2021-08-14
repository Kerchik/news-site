import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useParams, useHistory} from 'react-router-dom'
import s from './NewsArticle.module.css'
import Comments from './Comments'

const View = ({loggedIn}) => {
    const { id } = useParams();
    let history = useHistory()

    const [state, setState] = useState({
        id: null,
        title: null,
        content: null,
        photo: null,
        author: null,
    })

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
        fetch(`/api/news/${id}`)
        .then(handleResponse)
        .then(news => {
            setState({
                ...state,
                id: news.id,
                title: news.title,
                content: news.content,
                photo: news.photo,
                author: news.author,
            })
        })
        .catch((error) => {
            if (error?.status === 404) {
                console.error(error.message)
                history.push('/')
                return
            }
        })
           
    }, [])

    return (
        <div className={`content-width mt ${s.main}`}>
            <div className="row w-100 mx-0">
                <img src={state.photo} className="col-12 px-0" />
                <div className={`col-12 d-flex justify-content-end ${s.author}`}>
                    Author: <b>{state?.author?.name || 'DELETED'}</b>
                </div>
                <span className={`col-12 ${s.title}`}>
                    {state.title}
                </span> 
                <div className={`col-12 ${s.content}`} dangerouslySetInnerHTML={{__html: state.content}}></div>
            </div>
            <Comments 
                loggedIn={loggedIn}
                newsState={state}
            />
        </div>
    )
}

View.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}

export default View