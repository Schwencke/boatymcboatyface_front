import { useState, useEffect } from "react";
import { Buttons } from "./Buttons";
export default function CreateUser({ facade, handleModal}) {
    const init = { username: "", password: "" };
    const [credentials, setCredentials] = useState(init);
    const [usernameExists, setUsernameExists] = useState(false)
    const doesUsernameExists = (data) => {
        setUsernameExists(data.exists)
    }

    const createUsr = (evt) => {
      evt.preventDefault();
      facade.createUser(credentials.username, credentials.password);
      handleModal()
    }
    const onChange = (evt) => {
      setCredentials({ ...credentials,[evt.target.id]: evt.target.value })
      
    }

    useEffect(() => {
      facade.checkIfUsernameExists(credentials.username, doesUsernameExists)
    }, [onChange])
  
    return (
      <div>
        <br/><br/>
        <h3>Opret ny bruger</h3>
        <form onChange={onChange} >
          <input className="login-input"  placeholder="User Name" id="username"></input>
          <input className="login-input"  type="password" placeholder="Password" id="password" />
          {(usernameExists)?<p style={{color:"red"}}>Brugernavnet er optaget!</p>:<p style={{color:"green"}}>Brugernavnet er ledigt!</p>}
          {(usernameExists)?<Buttons text={"no"} className={"login-btn"} disabled={true}/>:<Buttons text={"yes"} className={"login-btn"} disabled={false} onclick={createUsr}/>}
        </form>
      </div>
    )
   
  }