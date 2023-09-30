import { useState } from "react";

function NoPage (){

    useState(() => {
        if (!localStorage.getItem("token")){
            window.location.href = "/login";
        }
    },[]);

    return (
        <div>
            <h1>{localStorage.getItem("token")}</h1>
        </div>
    );
}

export default NoPage;