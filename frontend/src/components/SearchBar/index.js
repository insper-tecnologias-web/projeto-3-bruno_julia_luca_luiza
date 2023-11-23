import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import "./index.css"
import axios from "axios";

export const SearchBar = () => {

    const [input, setInput] = useState("");

    const pegaDados = (value) => {
        value.preventDefault();
        axios
        //.get("https://moviefy-backend.onrender.com/title/" + value);
        .get("http://127.0.0.1:8000/title/" + value)
        .then((res) => {setInput(res.data)})
    }

    const mudaDados = (value) => {
        setInput(value);
        pegaDados(value);
    }

    return (
        <form className="input-wrapper" method="get" onSubmit={(e) => mudaDados(e.target.value)}>
        <FaSearch id="search-icon"/>
        <input 
        type="text" 
        placeholder="Procure o filme"  
        defaltvalue={input}  
        />
        <button type="submit"> Submit </button>

        </form>
    );
};