import React from 'react';
import googleImage from '../../assets/googleImage.png';
import styles from './LoginPage.module.css';

const LoginPage = () => {

    /*
        The sessionID is stored into a cookie, so if we make requests to the backend with our client, they can see our session ID, and get our information, from the session and run the deserialize user function
    */
    const googleLogin = () => {
        window.open("http://localhost:4000/auth/google", "_self");
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h1>Login</h1>
                <div 
                    className={styles.googleContainer} 
                    onClick={googleLogin}>
                    <img src={googleImage} alt="Google Icon" />
                    <p>Login With Google</p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
