import React from 'react'
import Modal from 'react-modal';
import PropTypes from 'prop-types'
import requests from '../../../../api/requests'
import s from '../NewsBlock.module.scss'

const DeleteModal = ({modalIsOpen, setIsOpenCallback, reloadItemsCallback, articleInfo, modalStyles}) => {
    Modal.setAppElement('#root')

    const closeModal = () => {
        setIsOpenCallback(false)
    }

    const removeArticle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        requests.deleteArticle(articleInfo.id).then(() => {
            setIsOpenCallback(false)
            reloadItemsCallback()
        })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
        >
            <div>Do you really want to delete this article?</div>
            <div className="d-flex justify-content-end">
                <button className={`btn btn-success ${s['modal-button']}`} onClick={removeArticle}>Yes</button>
                <button className={`btn btn-danger ml-2 ${s['modal-button']}`} onClick={closeModal}>No</button>
            </div>
        </Modal>
    )
}

DeleteModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    setIsOpenCallback: PropTypes.func,
    reloadItemsCallback: PropTypes.func,
    articleInfo: PropTypes.object,
    modalStyles: PropTypes.object,
}

export default DeleteModal