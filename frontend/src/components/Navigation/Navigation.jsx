import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>


    <div class ="nav-menu-wrapper">



      <div class="logo-wrapper">
      <h3><NavLink to="/"><img src="/UBNB.png" class="logo" alt="UBNB Logo" />Unicorn BnB</NavLink></h3>
      </div>



    <div class="login-wrapper">
    <ul>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>

    </div>
    </div>


    </>
  );
}

export default Navigation;
