import { useState } from "react";
import {Modal} from 'react-bootstrap'
import CreateUser from './Components/CreateUser'
export default function LogIn({facade, setLoggedIn }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleOpen = () => {
        setShowModal(true)
    }


    const performLogin = (evt) => {
      evt.preventDefault();
      facade.login(loginCredentials.username, loginCredentials.password, setLoggedIn);
    }
    const onChange = (evt) => {
      setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
    }
   
    return (
      <div className="login-card">
        <h2>Login</h2>
        <form onChange={onChange} >
          <input className="login-input" placeholder="User Name" id="username" /> <br />
          <input className="login-input" type="password" placeholder="Password" id="password" /> <br />
          <button className="login-btn" onClick={performLogin}>Login</button>
        </form>
        <button className="register-btn" onClick={handleOpen}>Ikke registeret endnu?</button>
        {/* <LoggedIn facade={facade}/> */}
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Opret en bruger</Modal.Title>
        </Modal.Header>
        <Modal.Body><CreateUser facade={facade}/></Modal.Body>
      </Modal>
      
      <p>
        <br/>
        <br/>
      Username: user Password: test <br/>
        Username: admin Password: test
        </p>
      </div>
    )
   
  }