import React from 'react'
import { useState } from 'react';
import {Modal, Collapse} from 'react-bootstrap'
import CreateUser from './CreateUser';

export const LoginModal = ({facade, modalShow, handleModal, setLoggedIn}) => {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [toggleRegister, setToggleRegister] = useState(false);
 

      const performLogin = (evt) => {
        evt.preventDefault();
        facade.login(loginCredentials.username, loginCredentials.password, setLoggedIn);
        handleModal()
    }

      const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
      }

    return (
        <Modal show={modalShow} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <form onChange={onChange} >
          <input className="login-input"  placeholder="User Name" id="username" />
          <input className="login-input"  type="password" placeholder="Password" id="password" />
          <button className="login-btn" onClick={performLogin}>Login</button>
        </form>
      </div>
      <button className="register-btn" onClick={() => setToggleRegister(!toggleRegister)} aria-controls= "register" aria-expanded={toggleRegister}>Ikke registeret endnu?</button>
      <Collapse in={toggleRegister}>
        <div id="register">
        <CreateUser facade={facade}handleModal={handleModal} />
        </div>
      </Collapse> 
        </Modal.Body>
      </Modal>
    )
}
