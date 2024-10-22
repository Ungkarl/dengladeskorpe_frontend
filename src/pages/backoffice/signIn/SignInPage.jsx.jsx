import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import styles from './SignInPage.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailNotEmpty, setEmailNotEmpty] = useState(false);
    const [passwordNotEmpty, setPasswordNotEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setEmailNotEmpty(emailValue.trim() !== '');
        setPasswordNotEmpty(passwordValue.trim() !== '');
    }, [emailValue, passwordValue]);

    const onSubmit = async (data) => {
        setLoading(true); // Start loading

        // Minimum loading time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        const { email, password } = data;

        const signInResult = signIn(email, password);

        // Wait for both the minimum loading time and the actual sign-in result
        await Promise.all([minLoadingTime, signInResult]);

        setLoading(false); // Stop loading

        if (await signInResult) {
            navigate('/backoffice/dashboard');
        } else {
            alert('Invalid email or password');
        }
    };

    if (loading) {
        return <div className={styles.loading}><PropagateLoader color="#355675" size={20} /></div>;
    }

    return (
        <div className={styles.login_container}>
            <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_group}>
                    <label htmlFor="email" className={styles.email_label}>Email</label>
                    <input
                        id="email"
                        type="text"
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                        className={`${styles.login_input} ${emailNotEmpty ? styles.not_empty : ''} ${errors.email ? styles.error : ''}`}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                    {errors.email && <p className={styles.error_text}>{errors.email.message}</p>}
                </div>
                
                <div className={styles.form_group}>
                    <label htmlFor="password" className={styles.password_label}>Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 3,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        className={`${styles.login_input} ${passwordNotEmpty ? styles.not_empty : ''} ${errors.password ? styles.error : ''}`}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    {errors.password && <p className={styles.error_text}>{errors.password.message}</p>}
                </div>
                
                <button type="submit" className={styles.login_button}>Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
