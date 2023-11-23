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
        .get("http://127.0.0.1:8000/title/" + input)
        .then((response) => {
            console.log(response.data);
        });
    }


    return (
        <div>
            <form className="input-wrapper" method="get" onSubmit={pegaDados}>
                <FaSearch id="search-icon"/>
                <input 
                type="text" 
                placeholder="Procure o filme"  
                defaltvalue={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit"> Submit </button>
            </form>

        </div>
        
        
    );
};