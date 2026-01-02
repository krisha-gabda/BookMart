import React from "react"
import "../styles/side-bar.css"

function SideBar() {
    return(
        <div className="SideBar">
            <h2>Menu</h2>
            <ul className="sidebar-menu">
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