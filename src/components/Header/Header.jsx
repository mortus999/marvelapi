import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import marvelLogo from '../../assets/marvel-logo.png';

const Header = ({ title }) => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <img src={marvelLogo} alt="Marvel Logo" className={styles.logo} />
            {title && <h1 className={styles.title}>{title}</h1>}
            <nav>
                {location.pathname !== '/' && (
                    <Link to="/" className={styles.navLink}>Home</Link>
                )}
                {location.pathname !== '/characters' && (
                    <Link to="/characters" className={styles.navLink}>Characters</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;