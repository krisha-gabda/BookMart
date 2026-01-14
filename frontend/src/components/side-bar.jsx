import React from "react"
import styles from "../styles/side-bar.module.css"

function SideBar() {
    return(
        <div className={styles.SideBar}>
            <h2>Menu</h2>
            <ul className={styles.sidebar_menu}>
                <li>Dashboard</li>
                <li>View Cart</li>
                <li>My Reviews</li>
                <li>Global Rankings</li>
                <li>AI Assistant</li>
            </ul>
        </div>
    )
}

export default SideBar;