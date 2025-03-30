import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className="nav-menu-wrapper">

        <div className="left-aligned-wrapper">


        <div className="logo-wrapper">
          <h3><NavLink to="/"><img src="/UBNB.png" className="logo" alt="UBNB Logo" /></NavLink></h3>

        </div>
        <div className='title-wrapper'>
          <h3><NavLink to="/">The Unicorn Experience</NavLink></h3>
        </div>
        </div>

        <div className="login-wrapper">

        <ul>
            {isLoaded && sessionUser && (
              <li>
          <h3><NavLink className="create-cornhole-text" to="/spots/new">Create a New Cornhole</NavLink></h3>
          </li>
            )}
          </ul>

          <ul>
            {isLoaded && (
              <li>
                <ProfileButton className="login-button" user={sessionUser} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navigation;
