import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import "./index.css"
import axios from "axios";
import Filme from "../Filme";

export const SearchBar = () => {

    const [input, setInput] = useState("");
    const [filmes, setFilmes] = useState([]);

    const pegaDados = (value) => {
        value.preventDefault();
        axios
        //.get("https://moviefy-backend.onrender.com/title/" + value);
        .get("http://127.0.0.1:8000/title/" + input)
        .then((res) => setFilmes(res.data));
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

            <div className="mx-[150px] flex flex-row flex-wrap justify-center ">
                {filmes.map((filme) => (
                    <div className="mx-2">
                        <Filme key={`filme__${filme.id}`} id={filme.id} capa={filme.primaryImage != null? filme.primaryImage.url:"https://fastly.picsum.photos/id/250/800/1200.jpg?hmac=mLfkxoNEwjCn6yE7Y7c4ExK1GoWmo69QwYcxQ7Rns_E"} title={filme.titleText.text} curtir={1} info={filme.plot.plotText.plainText}>{filme.releaseYear.year} </Filme>
                    </div>
                ))}
            </div>

        </div>  
    );
};

// export const SearchBar = (entrada) => {
//     return (
//         <div>
//             <form className="input-wrapper" method="get" onSubmit={pegaDados}>
//                 <input 
//                 type="text" 
//                 placeholder="Procure o filme"  
//                 defaltvalue={entrada}
//                 onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button type="submit"> 
//                     <FaSearch id="search-icon"/>
//                 </button>
//             </form>

//             <div className="mx-[150px] flex flex-row flex-wrap justify-center ">
//                 {filmes.map((filme) => (
//                     <div className="mx-2">
//                         <Filme key={`filme__${filme.id}`} id={filme.id} capa={filme.primaryImage != null? filme.primaryImage.url:"https://fastly.picsum.photos/id/250/800/1200.jpg?hmac=mLfkxoNEwjCn6yE7Y7c4ExK1GoWmo69QwYcxQ7Rns_E"} title={filme.titleText.text} curtir={1} info={filme.plot.plotText.plainText}>{filme.releaseYear.year} </Filme>
//                     </div>
//                 ))}
//             </div>

//         </div>  
//     );
// };