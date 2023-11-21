
import React from "react";
import Curtir from "../Curtir";
import Delete from "../Delete";
import "./index.css";

export default function Filme(props) {

  return (
    <div className="ease-in duration-300 flex-col group w-[250px] h-[520px] animation2 my-5 p-4 bg-[#20161C] dark:bg-darkSecondary shadow-xl hover:shadow duration-200 rounded-xl hover:w-[300px] hover:h-[540px]" >
      <Curtir index={props.id} hide={props.curtir}/>
      <Delete index={props.id} hide={props.curtir}/>
        <img className="ease-in duration-300 self-center w-[250px] h-[350px] rounded-xl group-hover:w-full group-hover:h-[380px]" src={props.capa} alt={props.title}/>
      <div className="self-center items-center mt-5">
        <h3 className="text-[#f5f5dc] text-lg	font-['Roboto'] font-extrabold text-center">{props.title}</h3>
        <div className="text-[#f5f5dc] text-lg	font-['Roboto'] text-center">{props.children}</div>
      </div>
    </div>
  );
}