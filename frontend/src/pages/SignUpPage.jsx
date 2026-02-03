import React from "react";
import { CiUser, CiLock, CiMail } from 'react-icons/ci';
import { useNavigate } from "react-router-dom";

import styles from '../styles/SignUpPage.module.css';

export default function SignUp() {
    return (
        <div className={styles.container}>
            <h2 className={styles.signup}>Sign Up</h2>
            <form className={styles.signup_form}>
                <div className={styles.input_wrapper}>
                    <CiMail className={styles.icons} />
                    <input type="email" name="email" required placeholder="Email..." />
                </div>
                <div className={styles.input_wrapper}>
                    <CiUser className={styles.icons} />
                    <input type="text" name="username" required placeholder="Username..." />
                </div>
                <div className={styles.input_wrapper}>
                    <CiLock className={styles.icons} />
                    <input type="password" name="password" placeholder="Enter Password..." required />
                </div>
                <div className={styles.input_wrapper}>
                    <CiLock className={styles.icons} />
                    <input type="password" name="password" placeholder="Confirm Password..." required />
                </div>
                <button type="submit" className={styles.submit_button}>Create Account</button>
                <p className={styles.to_login}>Already have an account? <a className={styles.login_link} href='/LogIn'>Log In</a></p>
            </form>
        </div>
    )
}
