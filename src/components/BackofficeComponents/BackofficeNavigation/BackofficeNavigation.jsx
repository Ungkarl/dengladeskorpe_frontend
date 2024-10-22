/* eslint-disable react/prop-types */
import styles from './BackofficeNavigation.module.css';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';


const BackofficeNavigation = ({ role }) => {
    //Frontend for the backoffice navigation and the active link is styled differently.
    return (
        <div className={styles.backoffice_nav}>
    <div className={styles.backoffice_navLogo}>
        LOGO
    </div>

    <div className={styles.backoffice_navLinks}>
        {role === "admin" ? (
            <ul>
                <li>
                    <NavLink
                        to="/backoffice/dashboard"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/backoffice/messages"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Beskeder
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/backoffice/employees"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Ansatte
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/backoffice/dishes"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Madretter
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/backoffice/orders"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Ordre
                    </NavLink>
                </li>
            </ul>
        ) : role === "guest" ? (
            <ul>
                <li>
                    <NavLink
                        to="/backoffice/dashboard"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Dashboard
                    </NavLink>
                </li>
            </ul>
        ) : (
            <div></div>
        )}
    </div>
    <Profile />
</div>
    )



};

export default BackofficeNavigation;