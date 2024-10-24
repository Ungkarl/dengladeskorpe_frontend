import styles from './BackofficePage.module.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BackofficeNavigation from '../../components/BackofficeComponents/BackofficeNavigation/BackofficeNavigation';

const BackofficePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signedIn, role, users, setRole, token  } = useAuth();
    useEffect(() => {
        setRole(role);
    }, [signedIn]);

    useEffect(() => { 
        if (role && location.pathname === '/backoffice') {
            navigate('/backoffice/dashboard');
        }
    }, [role, token]);
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
