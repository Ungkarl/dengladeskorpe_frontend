/* eslint-disable react/prop-types */
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";



export const AuthContextProvider = ({ children }) => {
const [auth, saveAuth] = useLocalStorage("auth", {});
const [user, setUser] = useState({});
const [role, setRole] = useState("");

const {dishes, categories, employees, messages, users, orders, setEmployees, setMessages, setOrders, setDishes } = useFetch();




const location = useLocation();
const navigate = useNavigate();
const token = auth.token ? auth.token : "";
const signedIn = auth.token !== undefined;

useEffect(() => {
    const checkUser = async () => {
        if (location.pathname.includes("/backoffice")) {
            if (auth.token !== undefined) {
                let response = await fetch("http://localhost:3042/auth/token", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({ token: auth.token })
                });
                let result = await response.json();

                if (result.message === "Token Expired") {
                    saveAuth({});
                setUser({});
                navigate('/backoffice/signin');
                }
                else {
                    setUser(result.data)
                    setRole(result.data.role)
                }
            } else {
                return navigate('/backoffice/signin');
            }
        }
    };
    checkUser();
}, [location.pathname, auth.token, navigate, saveAuth]);


const signIn = async (email, password) => {
    let response = await fetch('http://localhost:3042/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    let result = await response.json();
    console.log(result);
    //Check if token is string or even exists
    if (result.data === undefined || typeof result.data.token !== "string" || result.data.token.trim() === "") {
        return false;
    } else {
        saveAuth({ token: result.data.token });
        const user = jwtDecode(result.data.token);
        setUser(user);
        setRole(user.role);
        return true;
    }
};

const getUser = () => {
    return token !== "" ? jwtDecode(token) : {};
}

const signOut = () => {
    saveAuth({});
    setUser({});
    setRole("");
    navigate('/backoffice/signin');
};


//EMPLOYEE CRUD

    const addEmployee = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/employee", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            console.log(result);
            setEmployees(prevEmployees => [...prevEmployees, result.data]);

        } catch (error) {
            console.error('Failed to post employee.', error);
        }
    };


    const deleteEmployee = async (id) => {
        try {
            let response = await fetch(`http://localhost:3042/employee/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Failed to delete employee.', error);
        }
    };


    const updateEmployee = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/employee", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setEmployees(prevEmployees => prevEmployees.map(employee => employee._id === result.data._id ? result.data : employee));
        } catch (error) {
            console.error('Failed to update employee.', error);
        }    
    };

    //MESSAGES CRUD 
    const deleteMessage = async (id) => {
        try {
            let response = await fetch(`http://localhost:3042/message/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessages(prevMessages => prevMessages.filter(message => message._id !== id));
        } catch (error) {
            console.error('Failed to delete message.', error);
        }
    };

    const updateMessage = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/message", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setMessages(prevMessages => prevMessages.map(message => message._id === result.data._id ? result.data : message));
        }
        catch (error) {
            console.error('Failed to update message.', error);
        }

    };

    //ORDERS CRUD MINUS ADD
    const updateOrder = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/order", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setOrders(prevOrders => prevOrders.map(order => order._id === result.data._id ? result.data : order));
        }
        catch (error) {
            console.error('Failed to update order.', error);
        }
    };

    //DISHES CRUD
    const addDish = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/dish", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            console.log(result);
            setDishes(prevDishes => [...prevDishes, result.data]);

        } catch (error) {
            console.error('Failed to post dish.', error);
        }
    }

    //UPDATE DISH
    const updateDish = async (formData) => {
        try {
            let response = await fetch("http://localhost:3042/dish", {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setDishes(prevDishes => prevDishes.map(dish => dish._id === result.data._id ? result.data : dish));
        } catch (error) {
            console.error('Failed to update dish.', error);
        }
    }

    





const value = { user, setUser, role, signIn, token, signedIn, getUser, setRole, signOut, addEmployee, deleteEmployee, updateEmployee, deleteMessage, updateMessage, updateOrder, addDish, updateDish };


return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);

}


export const AuthContext = createContext({});
