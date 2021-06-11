import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import styles from './NavBar.module.css';
import { myContext } from '../../Context';
import { IUser } from '../../types/IUser';

const NavBar = () => {
  const userObject = useContext(myContext) as IUser;

  const logout = () => {
    axios
      .get('https://o-auth-video-backend.herokuapp.com/auth/logout', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        if (res.data === 'done') {
          window.location.href = '/';
        }
      });
  };

  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {userObject ? (
          <li onClick={logout}>Logout </li>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
