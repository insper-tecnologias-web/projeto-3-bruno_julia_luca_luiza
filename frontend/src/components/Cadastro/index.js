import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./index.css";


export default function Cadastro (){
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    

    async function cadastrar(e){
        e.preventDefault();
        setUser(user);
        setSenha(senha); 
        setEmail(email); 
       
        axios
        .post("http:///127.0.0.1:8000/api/users/", {
            "username": user,
            "password": senha,
            "email": email
          })
            .then( async ()=>{
                await axios
                .post('http://127.0.0.1:8000/token/', {
                    "username": user,
                    "password": senha
                  })
                  .then((res) => {
                    console.log("ENVIA TOKEN");
                    console.log(res.data.token);
                    sessionStorage.setItem('token', JSON.stringify(res.data.token));
                  })
            
            window.location.replace('/');
        });
    }

    return (
        <div className="alinha_3">
            <h2 className="fonte"> Fazer Cadastro</h2>
            <form onSubmit={cadastrar}>
            <label>
            <b>Usuario
            </b>
            </label>
            <input  type="text" placeholder="Usuário" onChange={e => setUser(e.target.value)}/>
            <label>
            <b>Senha
            </b>
            </label>
            <input  type="text"  name="senha"  placeholder="Senha" senha={senha} onChange={e => setSenha(e.target.value)}/>
            <label>
            <b>Email
            </b>
            </label>
            <input className="email" type="text"  name="email"  placeholder="email" email={email} onChange={e => setEmail(e.target.value)}/>    
            <button className="fonte3" type="submit">Criar usuário</button>
            
            </form>
        </div>
    );


}