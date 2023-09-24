import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
function Detailed(){
    const {id} = useParams();
    return (
        <div>
            <h1>Detailed {id}</h1>
        </div>
    );
}

export default Detailed;