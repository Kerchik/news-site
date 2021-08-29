import React from 'react'
import Modal from 'react-modal';
import PropTypes from 'prop-types'
import requests from '../../../api/requests'

const DeleteUserModal = ({deleteModalIsOpen, setDeleteModalIsOpenCallback, currentUser, setCurrentUserCallback, loadUsersCallback, setLoadingCallback, modalStyles}) => {
    Modal.setAppElement('#root')

    const closeModal = () => {
        setDeleteModalIsOpenCallback(false)
        setCurrentUserCallback(false)
    }

    const deleteUser = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoadingCallback(true)
        requests.deleteUser(currentUser.id)
        .then(() => {
            closeModal()
            setCurrentUserCallback(null)
            loadUsersCallback()
        })
    }

    return (
        <Modal
            isOpen={deleteModalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
        >
            <div>Do you really want to delete this user?</div>
            <div className="d-flex justify-content-end">
                <button className={`btn btn-success modal-button`} onClick={deleteUser}>Yes</button>
                <button className={`btn btn-danger ml-2 modal-button`} onClick={closeModal}>No</button>
            </div>
        </Modal>
    )
}

DeleteUserModal.propTypes = {
    deleteModalIsOpen: PropTypes.bool.isRequired,
    setDeleteModalIsOpenCallback: PropTypes.func,
    currentUser: PropTypes.object,
    setCurrentUserCallback: PropTypes.func,
    loadUsersCallback: PropTypes.func,
    setLoadingCallback: PropTypes.func,
    modalStyles: PropTypes.object,
}

export default DeleteUserModal