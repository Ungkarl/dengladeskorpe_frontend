import { useContext } from "react";
import { FetchContext } from "../context/fetchContext";


export const useFetch = () => useContext(FetchContext);