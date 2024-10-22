import styles from './BackofficePage.module.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BackofficeNavigation from '../../components/BackofficeComponents/BackofficeNavigation/BackofficeNavigation';

const BackofficePage = () => {
    const { signedIn,  token,  role, users, setRole,  } = useAuth();
    useEffect(() => {
        setRole("");
    }, [signedIn]);
    return (
        <div className={styles.backoffice_page}>
            <div className={styles.backoffice_nav_container}>
                <BackofficeNavigation role={role} />
            </div>

            <div className={styles.backoffice_content}>
                <Outlet context={{users, role}}/>
            </div>
        </div>
    );
};


export default BackofficePage;
