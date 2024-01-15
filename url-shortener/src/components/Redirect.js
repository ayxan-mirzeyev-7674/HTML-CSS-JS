import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Redirect(){

    const {id} = useParams()

    const [error, setError] = useState(null)

    const API_URL = "http://192.168.31.94:4000/get_url?url_id='" + id + "'";

    useEffect(() => {
        fetch(
            API_URL
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if(data.url){
                window.location.href = data.url;
              }else if(data.error){
                setError(data.error)
                console.log("Error:", data.error);
              }
            })
            .catch((error) => {
                setError(error)
              console.error("Error:", error);
            });
    }, [])

    return(<>{error}</>);
}

export default Redirect