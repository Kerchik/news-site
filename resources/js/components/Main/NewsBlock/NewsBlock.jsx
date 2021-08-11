import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import remove from '../../../img/remove.png'
import edit from '../../../img/edit.png'
import s from './NewsBlock.module.scss'
import requests from '../../../api/requests'

const NewsBlock = ({articleInfo, isUser, loggedUser, reloadItemsCallback}) => {
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
        history.push(`/news/edit/${articleInfo.id}`)
    }
    const [modalIsOpen,setIsOpen] = useState(false);
    const removeArticle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        requests.deleteArticle(articleInfo.id).then(() => {
            setIsOpen(false)
            reloadItemsCallback()
        })
    }
    return (
        <>
            <div className={s['news-block'] + " col-lg-6"}>
                <Link  to={`/news/${articleInfo.id}`}>
                <img src={articleInfo.photo} className={s['news-block-photo']}/>
                <div>
                    <span className={s['news-block-title']}>{articleInfo.title}</span>
                </div>
                {(isUser && loggedUser && loggedUser.role == 1) &&
                <div className={s['news-button-container']}>
                    <img className="pr-1" src={edit} onClick={openEditPage} />
                    <img src={remove} onClick={openModalWindow} />
                </div>
                }
                </Link>
            </div>
            { modalIsOpen &&
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
            }
        </>
    )
}

NewsBlock.propTypes = {
    articleInfo: PropTypes.object,
    isUser: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
}

export default NewsBlock