import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState({name : "user", id: "id", group : "group"})

    useEffect(() => {
        const login = localStorage.getItem('token');
        console.log(login)
        if (!login){
            navigate("/login")
        } else {
            setUser(JSON.parse(login))
        }
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    return(<h1>Welcome {user.name}</h1>)
}

export default Home;