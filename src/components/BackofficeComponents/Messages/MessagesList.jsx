import { useState} from "react";
import styles from "./MessagesList.module.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";


const MessagesList = () => {
    const { messages } = useFetch();
    const [searchTerm, setSearchTerm] = useState("");



    //Filtering based on search term. Name, description and subject are checked.
    const filteredMessages = (messages || []).filter(message => 
        message?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        message?.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        message?.subject?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
      <div className={styles.message_container}>
        <h1>MESSAGES ADMIN</h1>
        <div className={styles.search_message_bar}>
          <input
            type="text"
            placeholder="Search Messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.message_list}>
          {filteredMessages.map((message) => (
            <div key={message._id} className={styles.message_card}>
              <div className={styles.message_name}>{message.name}</div>
              <div className={styles.message_description}>
                <p>Emne: {message.subject}</p>
                <p>{message.description}</p>
                <label>LÆST: <input type="checkbox" checked={message.status} disabled /></label>
                
              </div>
              <div className={styles.message_actions}>
                <Link
                  className={styles.edit_link}
                  to={`/backoffice/messages/edit/${message._id}`}
                >
                  Edit
                </Link>
                <Link
                  className={styles.delete_link}
                  to={`/backoffice/messages/delete/${message._id}`}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MessagesList;

