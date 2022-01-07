import React from 'react'
import LogIn from "../Login";

const Home = ({loggedIn,facade, setLoggedIn}) => {
    return (
        <div>
      {!loggedIn ?<LogIn facade={facade} setLoggedIn={setLoggedIn}/>: <div>
        <br/>
        <h1>VELKOMMEN TIL CA2 OPGAVEN</h1>
        </div>}
        </div>
    )
}

export default Home
