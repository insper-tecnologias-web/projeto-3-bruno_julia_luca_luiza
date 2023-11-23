import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export const Menu = () => {
  const [generos, setGeneros] = useState('');
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaGenero, setListaGenero] = useState([]);

  useEffect(() => {
    const pegaDados = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/generos');
        let dados = Object.values(response.data).slice(1);
        //remove o segundo item de dados
        dados = dados.filter((item, index) => index !== 1);
        setListaGeneros(dados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    pegaDados();
  }, []);

  const pegaGenero = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/generos/${generos}`);
      const dados = Object.values(response.data);
      setListaGenero(dados);
    } catch (error) {
      console.error('Erro ao buscar dados do gênero:', error);
    }
  };

  const mudaGenero = (e) => {
    setGeneros(e.target.value);
  };

  const handleGenero = () => {
    console.log(`Gênero selecionado: ${generos}`);
    console.log('Lista de filmes com gênero escolhido:', listaGenero);
  };

  return (
    <div>
      <select className="fonte" value={generos} onChange={mudaGenero}>
        <option value="">Escolha um gênero</option>
        {listaGeneros.map((genre, index) => (
          <option className="fonte" key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button className='fonte2' onClick={pegaGenero}>Buscar Filmes</button>
      <button className='fonte2' onClick={handleGenero}>Mostrar Dados</button>
    </div>
  );
};
