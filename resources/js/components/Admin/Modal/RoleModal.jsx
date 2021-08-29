import React from 'react'
import Modal from 'react-modal';
import PropTypes from 'prop-types'
import requests from '../../../api/requests'

const RoleModal = ({roleModalIsOpen, setRoleModalIsOpenCallback, currentUser, setCurrentUserCallback, loadUsersCallback, userRoles, setLoadingCallback, modalStyles}) => {
    Modal.setAppElement('#root')

    const closeModal = () => {
        setRoleModalIsOpenCallback(false)
        setCurrentUserCallback(false)
    }
    const submitNewUserRole = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoadingCallback(true)
        requests.changeUserRole(currentUser, currentUser.id)
        .then(() => {
            closeModal()
            setCurrentUserCallback(null)
            loadUsersCallback()
        })
    }
    const changeCurrentUserRole = (e) => {
        setCurrentUserCallback({
            ...currentUser,
            role: +e.target.value
        })
    }
    return (
        <Modal
            isOpen={roleModalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
        >
            <div className="form-group mb-3">
                <label htmlFor="role-select">Choose role for this user:</label>
                <select id="role-select" className="form-control" value={currentUser?.role} onChange={changeCurrentUserRole}>
                    {Object.entries(userRoles).map(([, value]) => (
                        <option key={value.id} value={value.key}>{value.name}</option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-end">
                <button className={`btn btn-success modal-button`} onClick={submitNewUserRole}>Save</button>
                <button className={`btn btn-danger modal-button ml-2`} onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
    )
}

RoleModal.propTypes = {
    roleModalIsOpen: PropTypes.bool.isRequired,
    setRoleModalIsOpenCallback: PropTypes.func,
    currentUser: PropTypes.object,
    setCurrentUserCallback: PropTypes.func,
    loadUsersCallback: PropTypes.func,
    setLoadingCallback: PropTypes.func,
    modalStyles: PropTypes.object,
    userRoles: PropTypes.object,
}

export default RoleModal