import axios from "axios";
import "./index.css";
import {useState} from "react";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';



const labels = {
  1: 'Useless+',
  2: 'Poor+',
  3: 'Ok+',
  4: 'Good+',
  5: 'Excellent+',
};


export default function StarRating(props) {
  const [value, setValue] = useState();
  const [hover, setHover] = useState(-1);

  // console.log(props.index);
  // console.log(value);
  const darNota = async (nota) => {
    console.log(props.id, "ID DO LIKE");

        await axios
          .post("http://127.0.0.1:8000/filmes/ratings/" + props.id + "/" + nota + "/",{id:props.id, nota:nota})
        //   .uptade("https://moviefy-backend.onrender.com/filmes/ratings/", {id:props.index})
          .then((response) => {
            console.log(response.data);            
          })
            .catch((error) => {
                console.log(error);
            });
    }

  return (
        <div className="mr-0 ml-20 text-violet-300" >
            <Rating
                id={props.id}	
                name={props.id}
                value={value}
                precision={1}
                size="small"

                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                onClick={(event, newValue) => {
                  if (event.target.value !== undefined) {
                    setValue(event.target.value);
                    darNota(event.target.value)
                  }
                }}
            />
          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>
    );
}

