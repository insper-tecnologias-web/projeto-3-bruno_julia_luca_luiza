
import { useEffect, useState } from "react";
import axios from "axios";
import Filme from "./components/Filme";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [filmes, setFilmes] = useState([]);
  const carregaFilmes = () =>{
    axios
      .get("http://127.0.0.1:8000")
      // .get("https://moviefy-backend.onrender.com")
      .then((res) => setFilmes(res.data));
    }
    useEffect(() => {
      carregaFilmes();
    },[]);
  return (

    <div className="bg-[rgb(15.7 17.3 20.4)]">
      <header className="header">
            <Link to="/" className="w-28 h-28 my-3 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110">
              <img src='./logo.png' alt="Pagina Inicial"/>
            </Link>
            <h1 className="title">Meus Filmes</h1>
            <Link to="/filmes" className="w-28 h-28 my-2">
              <img src='./curti.png' alt="FIlmes Curtidos" className="mr-10 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110"/>
            </Link>
      </header>
      <div className="mx-[150px] flex flex-row flex-wrap justify-center ">
      {filmes.map((filme) => (
        <div className="mx-2">
          <Filme key={`filme__${filme.id}`} id={filme.id} capa={filme.primaryImage != null? filme.primaryImage.url:"https://fastly.picsum.photos/id/250/800/1200.jpg?hmac=mLfkxoNEwjCn6yE7Y7c4ExK1GoWmo69QwYcxQ7Rns_E"} title={filme.titleText.text} curtir={1} info={filme.plot.plotText.plainText}>{filme.releaseYear.year} </Filme>
        </div>
        ))}
      </div>
    </div>
  );
}
export default App;