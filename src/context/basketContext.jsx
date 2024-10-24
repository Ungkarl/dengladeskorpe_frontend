/* eslint-disable react/prop-types */
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useState, useEffect } from "react";



export const BasketContextProvider = ({ children }) => {
const [basket, setBasket] = useLocalStorage("basket", []);
const [basketTotal, setTotalPrice] = useState(0);
const [basketQuantity, setTotalQuantity] = useState(0);

const calculateTotals = (basket) => {
    const total = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const quantity = basket.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalQuantity(quantity);
};

useEffect(() => {
    calculateTotals(basket);
}, [basket]);

const addToBasket = (product) => {
    const existingProduct = basket.find(item => item._id === product.dish && item.size === product.size);
    let newBasket;

    if (existingProduct) {
        newBasket = basket.map(item =>
            item._id === product.dish && item.size === product.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        const newProduct = { ...product, quantity: 1 };
        newBasket = [...basket, newProduct];
    }

    setBasket(newBasket);
    calculateTotals(newBasket);
};


const placeOrder = async (order) => {
    let response = await fetch("http://localhost:3042/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(order),
    });
    let result = await response.json();
    console.log(result);
    return result;
};

const value = { basket, basketTotal, basketQuantity, addToBasket, placeOrder, setBasket, setTotalPrice, setTotalQuantity };


return (
    <BasketContext.Provider value={value}>
        {children}
    </BasketContext.Provider>
);


};


export const BasketContext = createContext();