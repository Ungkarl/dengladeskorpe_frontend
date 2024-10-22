import styles from './GlobalNavigation.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useBasket } from '../../hooks/useBasket';


const GlobalNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {basketQuantity} = useBasket();

      //Function for toggling the navigation
      const toggleMenu = () => {
        setIsOpen(!isOpen);
      
    };
    //Frontend for the global navigation

    return (
        <nav className={styles.navigation_bar}>
            <div className={styles.logo}>
                <Link to="/"><img src="/assets/images/logo.png" alt="" /></Link>
            </div>
            <div className={styles.basket_burger_container}>
                <div className={styles.basket}>
                    <Link to="/basket">
                    <img src="/assets//images/basket_icon.png" alt="" />
                    <p>{basketQuantity}</p>
                    </Link>
                </div>
                <div className={styles.burger} onClick={toggleMenu}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <ul className={`${styles.navigation} ${isOpen ? styles.show : ''}`}>
            <li>
                    <NavLink 
                        onClick={toggleMenu} 
                        to="/" 
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Forside
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={toggleMenu} 
                        to="/employees" 
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Personalet
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={toggleMenu} 
                        to="/contact" 
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Kontakt
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={toggleMenu} 
                        to="/basket" 
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Kurv
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        onClick={toggleMenu} 
                        to="/backoffice" 
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Backoffice
                    </NavLink>
                </li>
            </ul>

            </div>

            
        </nav>
    )


};

export default GlobalNavigation;