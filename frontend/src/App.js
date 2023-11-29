
import { useEffect, useState } from "react";
import axios from "axios";
import Filme from "./components/Filme";
import Login from "./components/Login";
import {Menu} from "./components/Menu";
import {Logout} from "./components/Logout";
import {SearchBar} from "./components/SearchBar";
import useToken from './useToken.js';
import { Link } from "react-router-dom";
import "./App.css";



function App() {
  console.log("App");
  const { token, setToken } = useToken();
  console.log(token)


  const [filmes, setFilmes] = useState([]);
  function setFilmesCall(filmes){
    setFilmes(filmes);
  }



  const carregaFilmes = () =>{
    console.log(token);
    console.log(`Token ${token}`)
    const options = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    axios
      .get("http://127.0.0.1:8000", options)
      //.get("https://moviefy-backend.onrender.com")
      .then((res) => setFilmes(res.data))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    carregaFilmes();
  },[]);
  
  if(token === 'undefined' || token === undefined || token === null || token === 'null') {
    return <Login setToken={setToken} />
  }

  

  return (

    <div className="bg-[rgb(15.7 17.3 20.4)]">
      <header className="header">
            <Link to="/" className="w-28 h-28 my-3 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110">
              <img src='./logo.png' alt="Pagina Inicial"/>
            </Link>

            <div className="search-bar">
              <SearchBar funcao={setFilmesCall}/>
            </div>
            <h1 className="title">Meus Filmes</h1>
            <div>
              <Menu funcao={setFilmesCall}/>
            </div>
            <div className="logout">
              <Logout />
            </div>



            
            <Link to="/filmes" className="w-28 h-28 my-2">
              <img src='./curti.png' alt="FIlmes Curtidos" className="mr-10 rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110"/>
            </Link>
      </header>
      <div className="mx-[150px] flex flex-row flex-wrap justify-center ">
      {filmes.map((filme) => (
        <div key={filme.id} className="mx-2">
          <Filme key={`${filme.id}`} id={filme.id} capa={filme.primaryImage != null? filme.primaryImage.url:"https://fastly.picsum.photos/id/250/800/1200.jpg?hmac=mLfkxoNEwjCn6yE7Y7c4ExK1GoWmo69QwYcxQ7Rns_E"} title={filme.titleText.text} curtir={1} info={filme.plot?.plotText != null? filme.plot.plotText.plainText:'Sem plot'}>{filme.releaseYear.year} </Filme>
        </div>
        ))}
      </div>

    </div>
  );
}
export default App;