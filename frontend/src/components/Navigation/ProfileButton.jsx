import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import { useNavigate, NavLink } from 'react-router-dom';
import "./ProfileButton.css";
import LoginFormModal from '../Modals/LoginFormModal/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal/SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();

    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");



  return (
    <>
      <div className='toggle-wrapper'>
      <button className="toggle-button" onClick={toggleMenu}>
      <FaBars size='18' style={{ marginRight: '2px', paddingLeft: '2px' }} />
      <FaUserCircle size='20' style={{ marginLeft: '2px' }} />
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName[0].toUpperCase() + user.firstName.slice(1)}</li>
            <li>{user.email}</li>
            <li><NavLink to="/spots/current">Manage Spots</NavLink></li>
            <li><NavLink to="/reviews/current">Manage Reviews</NavLink></li>
            <li>
              <button className="login-logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <div className='menu-box'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
