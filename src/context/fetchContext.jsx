import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



export const FetchContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);

    const [employees, setEmployees] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            let response = await fetch("http://localhost:3042/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setCategories(result.data);
        };
        fetchCategories();



    }, []);



    useEffect(() => {
        const fetchDishes = async () => {
            let response = await fetch("http://localhost:3042/dishes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setDishes(result.data);
        };
        fetchDishes();
        



    }, []);


    useEffect(() => {
        const fetchEmployees = async () => {
            let response = await fetch("http://localhost:3042/employees", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setEmployees(result.data);
        };
        fetchEmployees();



    }, []);


    useEffect(() => {
        const fetchMessages = async () => {
            let response = await fetch("http://localhost:3042/messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setMessages(result.data);
        };
        fetchMessages();



    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            let response = await fetch("http://localhost:3042/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setUsers(result.data);
        };
        fetchUsers();



    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            let response = await fetch("http://localhost:3042/messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setOrders(result.data);
        };
        fetchOrders();



    }, []);

    //Messages fetch
    useEffect(() => {
        const fetchMessages = async () => {
            let response = await fetch("http://localhost:3042/messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let result = await response.json();
            setMessages(result.data);
        };
        fetchMessages();
    }, []);
    
  

    

    const value = { dishes, categories, employees, messages, users, orders, setEmployees, setMessages, setUsers, setOrders, setDishes, setCategories };

    return (
        <FetchContext.Provider value={value}>
            {children}
        </FetchContext.Provider>
    )




};


export const FetchContext = createContext();