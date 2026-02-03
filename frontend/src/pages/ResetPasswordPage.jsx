import React from "react";
import { CiLock } from 'react-icons/ci';

import styles from "../styles/ResetPasswordPage.module.css";

export default function ResetPassword() {
    return(
        <div className={styles.container}>
            <h2 className={styles.reset}>Enter New Password</h2>
            <form className={styles.reset_form}>
                <div className={styles.input_wrapper}>
                    <CiLock className={styles.icons} />
                    <input type="password" name="password" required placeholder="Enter Password..." />
                </div>
                <div className={styles.input_wrapper}>
                    <CiLock className={styles.icons} />
                    <input type="password" name="confirm" required placeholder="Re-enter Password..." />
                </div>
                <button type="submit" className={styles.submit_button}>Confirm Password</button>
            </form>
        </div>
    )
}