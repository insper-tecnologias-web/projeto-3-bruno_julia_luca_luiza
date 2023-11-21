import axios from "axios";
import "./index.css";


export default function Delete(props) {
    const esconderCurtir = props.hide;

    const DeletarFilme = async () => {

        await axios
          .delete("http://127.0.0.1:8000/filmes/" +  props.index +'/')
        //   .delete("https://moviefy-backend.onrender.com/filmes", {id:props.index})
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
            .catch((error) => {
                console.log(error);
            });
    }
    if (esconderCurtir === 0) {
    return (
        <div id="delete" className="group mb-2 justify-end">
            <button className="rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110 hover:animate-bounce" onClick={DeletarFilme} type="submit" >
                <img src="./delete.png" alt="curtir" className="w-7 h-7 "/>
            </button>
        </div>
    );
    };
}