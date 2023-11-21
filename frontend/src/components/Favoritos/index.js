
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Filme from "../Filme";

export default function Favoritos(props) {
  const [filmes, setFilmes] = useState([]);
  const carregaMeusFilmes = () =>{
    axios
      .get("http://127.0.0.1:8000/filmes")
      // .get("https://moviefy-backend.onrender.com/filmes")
      .then((res) => setFilmes(res.data));
    }

  useEffect(() => {
    carregaMeusFilmes();
  },[]);
  
  return (
    <>
    <header className="header">
          <Link to="/" className="w-28 h-28 my-3 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110">
            <img src='./logo.png' alt=""/>
          </Link>
        <h1 className="title">Meus Filmes</h1>
          <Link to="/filmes" className="w-28 h-28 my-2 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110">
            <img src='./curti.png' alt="" className="mr-10"/>
          </Link>
    </header>
    <div className="flex flex-row flex-wrap justify-center">
    {filmes.map((filme) => (
        <div className="mx-2">
          <Filme key={`filme__${filme.id}`} id={filme.id}capa={filme.capa} title={filme.title} curtir={0} info={filme.info}>{filme.year} </Filme>
          {/* <Filme key={`filme__${filme.id}`} id={filme.id}capa={filme.primaryImage.url} title={filme.titleText.text}>{filme.releaseYear.year}</Filme> */}
        </div>
        ))}
      </div>
    </>
  );
}