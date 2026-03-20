import { Outlet } from "react-router-dom";
import NavBar from "./navigation-bar";
import SideBar from "./side-bar";
import styles from "../styles/mainPage.module.css";

export default function Layout() {
    return(
        <div className={styles.page}>
            <NavBar />
            <div className={styles.main_page}>
                <SideBar />
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}