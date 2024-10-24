import { useContext } from "react";
import { FetchContext } from "../context/fetchContext";


// Custom hook to use the FetchContext
export const useFetch = () => useContext(FetchContext);