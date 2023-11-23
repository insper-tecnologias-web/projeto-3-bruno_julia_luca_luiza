
import React from "react";
import Curtir from "../Curtir";
import Delete from "../Delete";
import "./index.css";
import StarRating from "../Ratings";
export default function Filme(props) {

  return (
    <div className="flex flex-row group ease-in duration-300 w-[250px] h-[520px] animation2 my-5 p-4 bg-[#20161C] dark:bg-darkSecondary shadow-xl hover:shadow duration-200 rounded-xl hover:w-[500px] hover:h-[560px] ">
      <div className="flex flex-col" >
        <Curtir index={props.id} hide={props.curtir}/>
        <Delete index={props.id} hide={props.curtir}/>
        <StarRating key={props.id} id={props.id}/>
          <img className="ease-in duration-300 self-center w-[250px] h-[350px] rounded-xl group-hover:w-full group-hover:h-[380px]" src={props.capa} alt={props.title}/>
        <div className="self-center items-center mt-5">
          <h3 className="text-[#f5f5dc] text-lg	font-['Roboto'] font-extrabold text-center">{props.title} - {props.id}</h3>
          <div className="text-[#f5f5dc] text-lg	font-['Roboto'] text-center">{props.children}</div>
        </div>
      </div>
      <div className="gruop-hover:transition group-hover:ease-in-out group-hover:ml-10 group-hover:delay-300 invisible w-[0px] group-hover:visible group-hover:w-[200px] flex flex-col justify-center flex-wrap whitespace-normal text-[#f5f5dc] text-lg	font-['Roboto'] text-center">{props.info}</div>
    </div>
  );
}