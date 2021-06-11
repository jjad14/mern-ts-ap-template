import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import styles from './NavBar.module.css';

const NavBar = () => {
  const logout = () => {};

  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        <li>
          <Link to='/'>Home</Link>
        </li>

        <li onClick={logout}>Logout </li>

        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
