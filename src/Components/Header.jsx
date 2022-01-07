import { NavLink } from 'react-router-dom';
import { LoginModal } from './LoginModal';
import { useState } from 'react';

function Header({facade, loggedIn, logout, login, setLoggedIn}) {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  return (
    <div className="hdiv">
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {facade.hasUserAccess('user', loggedIn) && (
          <li>
            <NavLink activeClassName="active" to="/valutaberegner">
              Valutaberegner
            </NavLink>
          </li>
        )}
        {facade.hasUserAccess('admin', loggedIn) && (
          <li>
            <NavLink activeClassName="active" to="/products">
              Products
            </NavLink>
          </li>
        )}
        
        {(loggedIn)?<NavLink activeClassName="active" to="/" className="logout_button" onClick={logout}>Logout</NavLink>:
        <NavLink activeClassName="active" to="#" className="logout_button" onClick={handleLoginModal}>Login</NavLink>}
          
      </ul>
      <LoginModal login={login} facade={facade} modalShow={showLoginModal} handleModal={handleLoginModal} setLoggedIn={setLoggedIn}/>
    </div>
  
  );
}

export default Header;