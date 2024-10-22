import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {  useNavigate, Outlet } from "react-router-dom";
import MessagesList from "../../../components/BackofficeComponents/Messages/MessagesList";

const MessagesDashboard = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { deleteMessage, updateMessage } = useAuth();
    useEffect(() => {
        if (role === "guest") {
            navigate('/management');
        }
    }, [role, navigate]);

    

    return (
        <div>
            {role === "admin" ? (
                <div> 
                    <MessagesList />
                    <Outlet context={{ deleteMessage, updateMessage }} />
                </div>
            ) : null}
        </div>
    );
};

export default MessagesDashboard;
