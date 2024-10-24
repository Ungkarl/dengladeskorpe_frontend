import { useContext } from "react";
import { AuthContext } from "../context/authContext";


// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);