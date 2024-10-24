import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";
import { useState } from "react";
import FullscreenLoader from "../FullscreenLoader/FullscreenLoader";



const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     const [showSuccess, setShowSuccess] = useState(false);



     //Function to post the message
     const postMessage = async (data) => {
        setIsLoading(true);
        setErrorMessage('');
        setShowSuccess(false);

        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2 seconds delay

        try {
            const response = await fetch("http://localhost:3042/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const dataResponse = await response.json();

            if (dataResponse.status === 'error') {
                throw new Error(dataResponse.message || "An unknown error occurred.");
            }
            setIsLoading(false);
            
            setTimeout(() => {
                setShowSuccess(true);
            }, 1000);
            
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            setIsLoading(false);
            setErrorMessage('Der opstod en fejl. Prøv igen.');
        } finally {
            setIsLoading(false);
        }
    };
    
    //Function to close the success message
    const closeSuccess = () => {
        setShowSuccess(false);


    };


    return (
        <div className={styles.contact_form_container}>
        {isLoading && (
            <FullscreenLoader />
        )}
        {errorMessage && (
            <div className={styles.error_message}>
                {errorMessage}
            </div>
        )}
        {showSuccess && (
             <div className={styles.message_success}>
             <img src="/assets/images/pineapple.png" alt="" />
             <p className={styles.success_message}>Tak for din besked!</p>
             <p className={styles.success_submessage}>Vi vender tilbage hurtigst muligt.</p>
             <div onClick={closeSuccess} className={styles.close_success}>X</div>
             <div className={styles.success_overlay}></div>
         </div>
        )}
        <form className={`${styles.contact_form} ${isLoading ? styles.hidden : ''}`} onSubmit={handleSubmit(postMessage)}>
            <div className={styles.contact_field}>
                <label htmlFor="name">Navn</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                  
                    {...register('name', { required: 'Navn er påkrævet' })}
                />
                {errors.name && <p className={styles.error_message}>{errors.name.message}</p>}
            </div>
            <div className={styles.contact_field}>
                <label htmlFor="subject">Emne</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                 
                    {...register('subject', { required: 'Emne er påkrævet' })}
                />
                {errors.subject && <p className={styles.error_message}>{errors.subject.message}</p>}
            </div>
            <div className={styles.contact_field}>
                <label htmlFor="description">Besked</label>
                <textarea
                    id="description"
                    name="description"
                  
                    {...register('description', { required: 'Besked er påkrævet' })}
                />
                {errors.description && <p className={styles.error_message}>{errors.description.message}</p>}
            </div>
            <button className={styles.contact_send_btn} type="submit">Send</button>
        </form>
    </div>
    );
};

export default ContactForm;