import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./DeleteMessage.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";

import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";



const DeleteMessage = () => {
    const { messages } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { deleteMessage } = useOutletContext();


    useEffect(() => {
        const fetchMessage = async () => { 
            await new Promise(resolve => setTimeout(resolve, 2000));
            const message = messages.find(message => message._id === id);
            console.log(message);
            setMessage(message);
        };
        fetchMessage();
    }, [messages, id]);


    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Simuleret ventetid på 2 sekunder
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Kald deleteUser fra useOutletContext
        await deleteMessage(id);
        navigate("/backoffice/messages");
        setLoading(false); // Stop loading
    };


    if (loading) {
        return <FullscreenLoader />;
    }

    if (!message) {
        return  <FullscreenLoader />;
    }


    return (
        <div className={styles.deleteMessageContainer}>
        <div className={styles.message}>
            <Link to="/backoffice/messages" className={styles.messageBackButton}>
                <IoIosArrowRoundBack />
            </Link>
            <div className={styles.messageInfo}>
                <h2>{message.name}</h2>
                <p>{message.description}</p>
                <label>LÆST: <input type="checkbox" checked={message.status} disabled /></label>
            </div>
            <button className={styles.deleteConfirmBtn} onClick={handleDelete}>
                CONFIRM DELETION
            </button>
        </div>
    </div>
    )



};


export default DeleteMessage;