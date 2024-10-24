/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";




export const FetchContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);

    const [employees, setEmployees] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);


    //Fetching categories
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


    //Fetching dishes
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

    //Fetching employees
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


    //Fetching messages
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


    //Fetching users
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


    //Fetching orders
    useEffect(() => {
        const fetchOrders = async () => {
            let response = await fetch("http://localhost:3042/orders", {
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

    //Fetching messages
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
    
  

    
    //Object with all the values
    const value = { dishes, categories, employees, messages, users, orders, setEmployees, setMessages, setUsers, setOrders, setDishes, setCategories };


    //Return the provider with the value object
    return (
        <FetchContext.Provider value={value}>
            {children}
        </FetchContext.Provider>
    )




};


export const FetchContext = createContext();