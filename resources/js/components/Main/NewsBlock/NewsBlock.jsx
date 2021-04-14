import React, {useState} from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import remove from '../../../img/remove.png'
import edit from '../../../img/edit.png'
import s from './NewsBlock.module.css'
import requests from '../../../api/requests'

const NewsBlock = ({props, isUser, loggedUser}) => {
    let history = useHistory()
    Modal.setAppElement('#root')

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding               : '50px'
        }
      };
    const openModalWindow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const openEditPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/news/edit/${props.id}`)
    }
    const [modalIsOpen,setIsOpen] = useState(false);
    const removeArticle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        requests.deleteArticle(props.id).then(() => {
            setIsOpen(false)
            history.go(0)
        })
    }
    return (
        <>
            <div className={s['news-block'] + " col-lg-6"}>
                <Link  to={`/news/${props.id}`}>
                <img src={props.photo} className={s['news-block-photo']}/>
                <div>
                    <span className={s['news-block-title']}>{props.title}</span>
                </div>
                {(isUser && loggedUser && loggedUser.role == 1) &&
                <div className={s['news-button-container']}>
                    <img className="pr-1" src={edit} onClick={openEditPage} />
                    <img src={remove} onClick={openModalWindow} />
                </div>
                }
                </Link>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>Do you really want to delete this article?</div>
                <div className="d-flex justify-content-end">
                    <button className={`btn btn-success ${s['modal-button']}`} onClick={removeArticle}>Yes</button>
                    <button className={`btn btn-danger ml-2 ${s['modal-button']}`} onClick={closeModal}>No</button>
                </div>
            </Modal>
        </>
    )
}

export default NewsBlock