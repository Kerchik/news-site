import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import DeleteModal from './Modal/DeleteModal'
import remove from '../../../img/remove.png'
import edit from '../../../img/edit.png'
import s from './NewsBlock.module.scss'

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

    const [modalIsOpen,setIsOpen] = useState(false);

    const openModalWindow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true)
    }
    const openEditPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/news/edit/${articleInfo.id}`)
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
                <DeleteModal 
                    modalIsOpen={modalIsOpen}
                    setIsOpenCallback={setIsOpen}
                    reloadItemsCallback={reloadItemsCallback}
                    modalStyles={customStyles}
                    articleInfo={articleInfo}
                />
            }
        </>
    )
}

NewsBlock.propTypes = {
    articleInfo: PropTypes.object,
    isUser: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object,
    reloadItemsCallback: PropTypes.func,
}

export default NewsBlock