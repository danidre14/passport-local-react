import React from "react";

import makeRequest from "../makeRequest";
import { withRouter } from "react-router-dom";

function SignOut(props) {
    function signOut() {
        makeRequest([`/api/signout`, "delete"], {}, (data) => {
            if (data === "Success") {
                props.history.push(`/signin`)
                if (props.signOut) props.signOut();
            }
        }, (message) => {
            alert("Error logging out: " + message);
        })
    }

    return (
        <button onClick={signOut}> Sign Out</button>
    );
}

export default withRouter(SignOut);