import React from "react";

import { Link } from "react-router-dom";
import makeRequest from "../makeRequest";
import useInputChange from "./useInputChange.jsx";

function SignIn(props) {
    const [{ name, email, password }, handleInputChange] = useInputChange({
        name: "",
        email: "",
        password: ""
    });

    const doSignIn = (e) => {
        e.preventDefault();

        console.log("tried to sign in");

        // return;
        const post = { email, password }//validatePost({ username, title, body });
        // if (!post) return setError("Invalid post");

        function postData() {
            makeRequest([`/api/signin/`, "post"], post, (data) => {
                if (data === "Success")
                    props.history.push(`/users`)
                else
                    alert("Failed SignIn: " + data)
            }, (message) => {
                // setError(`Cannot post blog: ${message}`);
                alert("Error");
            })
        }
        postData();
    }

    return (
        <>
            <h1>Sign In</h1>
            <form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required
                        value={email}
                        onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" required
                        value={password}
                        onChange={handleInputChange} />
                </div>
                <button type="submit" onClick={doSignIn}>Sign In</button>
            </form>
            <hr />
            <Link to="/signup"> Sign Up</Link>
        </>
    );
}

export default SignIn;