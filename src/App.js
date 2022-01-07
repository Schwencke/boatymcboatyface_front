import React, { useState,useEffect } from "react"
import Facade from "./apiFacade";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Company from "./Components/Valutaberegner"
import Header from "./Components/Header"
import Home from "./Components/Home"
import Products from "./Components/Products"
import './App.css'
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
 const [loggedIn, setLoggedIn] = useState(false)
 
  const logout = () => { Facade.logout()
    setLoggedIn(false)} 

  // const login = (user, pass, setLoggedIn) => {
  //   Facade.login(user,pass,setLoggedIn)
  //   //.then(res =>setLoggedIn(true));
  // } 
 
  useEffect(() =>{
    if (Facade.getToken()!=null && Facade.verifyToken()){
      console.log("token was verified")
      setLoggedIn(true)
    }
  }, [])



  return (
    <Container>
      <Router>
        <Header facade={Facade} loggedIn={loggedIn} logout={logout} setLoggedIn={setLoggedIn}/>
        <Switch>
          <Route exact path="/">
          <Home loggedIn={loggedIn} facade={Facade} setLoggedIn={setLoggedIn}
          />
          </Route>
          <Route exact path="/Valutaberegner">
            {Facade.hasUserAccess('user', loggedIn) &&
          <Company facade={Facade} // props for company
          />}
          </Route>
          <Route exact path="/Products">
            {Facade.hasUserAccess('admin', loggedIn) &&
          <Products facade={Facade} // props for company
          />}
          </Route>
      
        </Switch>
        </Router>
    </Container>
  )
 
}
export default App;
