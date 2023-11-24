import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export const Menu = (props) => {
  const [generos, setGeneros] = useState('');
  const [listaGeneros, setListaGeneros] = useState([]);
  const [listaGenero, setListaGenero] = useState([]);

  useEffect(() => {
    const pegaDados = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/generos');
        let dados = Object.values(response.data).slice(1);
        dados = dados.filter((item, index) => index !== 1);
        setListaGeneros(dados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    pegaDados();
  }, []);

  useEffect(() => {
    const handleGenero = () => {
      console.log(`Gênero selecionado: ${generos}`);
      console.log('Lista de filmes com gênero escolhido:', listaGenero);
      props.funcao(listaGenero);
    };

    if (listaGenero.length > 0) {
      handleGenero();
    } else if (generos !== '') {
      const timeoutId = setTimeout(() => {
        window.location.href = '/erro'; // Substitua '/erro' pelo URL desejado
      }, 5000); // 15 segundos (ajuste conforme necessário)

      return () => clearTimeout(timeoutId);
    }
  }, [listaGenero, generos, props]);

  const pegaGenero = async () => {
    if (generos === '') {
      window.location.href = '/erro'; // Substitua '/erro' pelo URL desejado
      return;
    }

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
    </div>
  );
};
