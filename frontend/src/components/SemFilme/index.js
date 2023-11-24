
import { Link } from "react-router-dom";
import {FaHome} from "react-icons/fa"
import "./index.css";

export const SemFilme = () => {
  


  return (
    <><p className='fonte_1'>Não tem filme correspondente a esse gênero :(</p>
    <p className='fonte_1'>Clique no botão abaixo para escolher outro gênero!</p>
          <div className='alinha_1'>
              <Link to="/" className='alinha_1'>
                    <FaHome size={60} color='white' />
                    <h1 className='fonte2_1'>Ínicio</h1>
              </Link>
          </div></>
  );

};
