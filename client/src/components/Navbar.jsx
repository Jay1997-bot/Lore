import React from 'react';
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <h1>
                <Link 
                    to="/" 
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    Historical Figures
                </Link>
            </h1>
            <Link to="/figures/new" style={{ backgroundColor: "goldenrod", padding: "10px", border: "none", color: "white", textDecoration: "none", borderRadius: "5px", display: "inline-block" }}>
                Add Historical Figure
            </Link>
            <Link to="/timeline" style={{ backgroundColor: "gray", padding: "10px", border: "none", color: "white", textDecoration: "none", borderRadius: "5px", display: "inline-block", marginLeft: "10px" }}>
                Timeline
            </Link>
        </nav>
    );
}

export default Navbar;
