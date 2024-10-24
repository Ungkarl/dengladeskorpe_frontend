import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import styles from "./EditMessage.module.css"
import { IoIosArrowRoundBack } from "react-icons/io";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";
import { useForm } from "react-hook-form";


const EditMessage = () => {
    const { messages } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateMessage } = useOutletContext();
    const { register, handleSubmit } = useForm();


    //Fetching the message if messages and id is available
    useEffect(() => {
        const fetchMessage = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const message = messages.find(message => message._id === id);
            console.log(message);
            setMessage(message);
        };
        fetchMessage();
    }, [messages, id]);


    //Function to handle the update of the message
    const handleUpdate = async (data) => {
        setLoading(true); 

        // Simulated waiting time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

       let formData = new FormData();
         formData.append("name", message.name);
         formData.append("subject", message.subject);
         formData.append("description", message.description);
         //status is a boolean value, meaning true is checked and false is unchecked
        formData.append("status", data.status);
        formData.append('id', id);

        const updateMessageResult = updateMessage(formData);

        //Wiating for both promises to resolve
        await Promise.all([minLoadingTime, updateMessageResult]);

        setLoading(false); 
        navigate("/backoffice/messages");




    };

    
    //Loading screens
    if (loading) {
        return <FullscreenLoader />;
    }

    if (!message) {
        return <FullscreenLoader />;
    }


    return (
        <div className={styles.editMessageContainer}>
            <div className={styles.message}>
                <Link to="/backoffice/messages" className={styles.messageBackButton}>
                    <IoIosArrowRoundBack />
                </Link>
            </div>
            <form className={styles.editMessageForm} onSubmit={handleSubmit(handleUpdate)}>
                <div className={styles.messageInfo}>
                    <h2>{message.name}</h2>
                </div>
                <label className={styles.upd_label}>
                    <span>Emne</span>
                    <input className={styles.upd_input} type="text" disabled defaultValue={message.subject} {...register("subject")} />
                </label>
                <label className={styles.upd_label}>
                    <span>Beskrivelse</span>
                    <textarea  className={styles.upd_input} disabled defaultValue={message.description} {...register("description")} />
                </label>
                <label className={styles.upd_label}>
                    <span>Læst</span>
                    <input className={styles.upd_tickbox} type="checkbox" defaultChecked={message.status} {...register("status")} />
                </label>
                <button className={styles.updateConfirmBtn} type="submit">Opdater besked</button>
            </form>
        </div>
    )



};

export default EditMessage;