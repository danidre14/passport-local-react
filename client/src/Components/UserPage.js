import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import makeRequest from "../makeRequest";

function UserPage(props) {
    const [userName, setUserName] = useState(false);

    function fetchUser() {
        makeRequest([`/api/users`, "get"], {}, (data) => {
            if (data.message === "Success")
                setUserName(data.username);
        }, (message) => {
            alert("Error: Got error");
        })
    }


    useEffect(() => {
        fetchUser();
    }, [])

    const userMessage = userName !== false ? <><p>Welcome {userName}</p></> : <p>No user logged in</p>

    return (
        <>
            <h1>User Page</h1>
            {userMessage}
        </>
    );
}

export default UserPage;