import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logo.png";
import BurgerMenu from "./BurgerMenu";
import Drawer from "./Drawer";
import AvatarUser from "../Atom/Avatar/AvatarUser";
import AvatarUser2 from "../Atom/Avatar/AvatarUser2";
import { useEffect } from "react";
//import { UserContext } from '../../context/userContext';
import { useAuth } from '../../hooks/index';
import jwt_decode from "jwt-decode";

function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [islogged, setLogged] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 761px)" });
  const [user, setUser] = useState({});
  const { pathname } = useLocation();
  const {token, setToken} = useAuth();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if(token) {
      const decoded = jwt_decode(token);
      const userDecoded = {name: decoded.name, lastName: decoded.lastName, id: decoded.id};
      setLogged(true);
      setUser(userDecoded);
    }
  }, [token]);



  return (
    <>
      {drawer ? (
                <div className={styles.menu}>
                  {islogged && (pathname === "/" ||  pathname !== '/login') && isMobile ? (
                                                        <AvatarUser
                                                            closeSesion={() => {
                                                            setLogged(false);
                                                            localStorage.clear()
                                                            navigate(0)
                                                          }}
                                                          closeMenu={() => setDrawer(false)}
                                                          user={user}
                                                        />
                  ) : (
                                                        <Drawer closeDrawer={() => setDrawer(false)} />
                  )}
                  
                </div>
              ) : (
              <div className={styles.navbar_container}>
                <div className={styles.navbar_logo}>
                  <Link to="/" className={styles.link_logo}>
                    <img className={styles.logo} src={logo} alt="logo" />
                    <p className={styles.slogan}>Para viajes memorables</p>
                  </Link>
                </div>
                <div onClick={() => setDrawer(true)} className={styles.burger_icon}>
                  <BurgerMenu />
                </div>
                    {islogged && (pathname === "/" || pathname !== '/login') && !isMobile ? (
                                                  <AvatarUser2
                                                      closeSesion={() => {
                                                      setLogged(false);
                                                      localStorage.clear()
                                                      navigate(0)
                                                    }}
                                                    user={user}
                                                  />
                    ) : (
                      <div className={`${styles.login} ${styles.active}`}>
                        {(pathname === "/" || pathname ) && (<>
                                                <Link to="/user-register" className={styles.link}>
                                                { pathname === '/user-register' ? '' : <button className={styles.button}>Crear cuenta</button> }
                                                
                                                </Link>
                                                <Link to="/login" className={styles.link}>
                                                { pathname === '/login' ? '' : <button className={styles.button}>Iniciar sesión</button> }
                                                </Link>
                                              </>
                        )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
