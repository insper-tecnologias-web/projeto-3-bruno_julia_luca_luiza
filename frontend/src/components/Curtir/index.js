import axios from "axios";
import "./index.css";


export default function Curtir(props) {
    const esconderCurtir = props.hide;

    const FavoritarFilme = async () => {

        await axios
          // .post("http://127.0.0.1:8000/", {id:props.index})
          .post("https://moviefy-backend.onrender.com/", {id:props.index})
          .then((response) => {
            console.log(response.data);
          })
            .catch((error) => {
                console.log(error);
            });
    }
    if (esconderCurtir === 1) {
    return (
        <div id="like" className="group mb-2 justify-end">
            <button className="rounded-md bg-indigo-900 p-1 border-2 border-slate-400 hover:bg-indigo-800 hover:scale-110 hover:animate-bounce" onClick={FavoritarFilme} type="submit" >
                <img src="./curti.png" alt="curtir" className="w-7 h-7 "/>
            </button>
        </div>
    );
    };
}