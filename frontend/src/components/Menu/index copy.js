import React, {useEffect, useState} from 'react'
import "./index.css"
import axios from "axios";

export const Menu = () => {

    const [generos, setGeneros] = useState([]);
    const [lista, setListaGeneros] = useState([]);
    const [genero_escolhido, setGeneroEscolhido] = useState([]);


    useEffect(() => {
        const pegaDados = async () => {
            
            await axios.get("http://127.0.0.1:8000/generos")
            .then((response) => {
                let dados = response.data;
                dados = Object.values(dados);
                dados = dados.slice(1); //retira o primeiro item porque era null (problema da api)
                setListaGeneros(dados);
                //console.log(dados);
            });
        };
        pegaDados();

    }, []);

    const [lista_genero, setListaGenero] = useState([]);


    const pegaGeneros = async () => {
        await axios
        .get("http://127.0.0.1:8000/generos/" + generos)
        .then((response) => {
            console.log(response)
            let dados = response.data;
            dados = Object.values(dados);
            setListaGenero(dados);
        }); 
    }


    const mudaGenero = (e) => {
        setGeneros(e.target.value);
        handleGenero(e.target.value);
    };

    const handleGenero = (genero) => {
        console.log(`Gênero selecionado: ${genero}`);
        console.log(`Lista de filmes com gênero escolhido: ${lista_genero}`);
    };


    return (
        <div>
            
            <select className='fonte' value={generos} onChange={mudaGenero}>
                <option value=""> Escolha um gênero </option>
                
                {lista.map((genre, index) => (
                    <option className='fonte' key={index} value={genre}>
                        {genre}
                    </option>  
                ))};
            </select>
            

        </div>



    );
};