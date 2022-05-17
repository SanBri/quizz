import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/auth";
import NavLink from "../NavLink";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return (
    <header>
      <div className='header'>
        <nav>
          <div className='header__links'>
            <NavLink text='Accueil' link='/' />
            <NavLink text='Catégories' link='/categories' />
            {!isAuthenticated ? (
              <NavLink text='Connexion' link='/login' />
            ) : (
              <>
                <NavLink text='Ajouter une Question' link='/post-question' />
                <p onClick={() => dispatch(logout())}>Déconnexion</p>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
