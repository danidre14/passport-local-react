import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import makeRequest from "../makeRequest";

function UserPage(props) {
    const [userName, setUserName] = useState(false);

    function fetchUser() {
        makeRequest([`/api/users`, "get"], {}, (data) => {
            if (data.message === "Success")
                setUserName(data.value);
        }, (message) => {
            alert("Error: Got error");
        })
    }

    function signOut() {
        makeRequest([`/api/signout`, "delete"], {}, (data) => {
            if (data === "Success") {
                setUserName(false);
                props.history.push(`/signin`)
            }
        }, (message) => {
            alert("Error logging out");
        })
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const userMessage = userName !== false ? <><p>Welcome {userName}</p>
        <button onClick={signOut}> Sign Out</button></> : <p>No user logged in</p>

    return (
        <>
            <h1>User Page</h1>
            {userMessage}
        </>
    );
}

export default UserPage;