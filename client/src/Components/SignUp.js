import React from "react";

import { Link } from "react-router-dom";
import makeRequest from "../makeRequest";
import useInputChange from "./useInputChange.jsx";

function SignUp(props) {
    const [{ name, email, password }, handleInputChange] = useInputChange({
        name: "",
        email: "",
        password: ""
    });

    const doSignUp = (e) => {
        e.preventDefault();

        console.log("tried to sign up");

        const post = { name, email, password }//validatePost({ username, title, body });
        // if (!post) return setError("Invalid post");

        function postData() {
            makeRequest([`/api/signup/`, "post"], post, (data) => {
                if (data === "Success")
                    props.history.push(`/signin`)
                else
                    alert("Failed: " + data)
            }, (message) => {
                // setError(`Cannot post blog: ${message}`);
                alert("Errorrr: " + message);
            })
        }
        postData();
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" required
                        value={name}
                        onChange={handleInputChange} />
                </div>
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
                <button type="submit" onClick={doSignUp}>Sign Up</button>
            </form>
            <hr />
            <Link to="/signin"> Sign In</Link>
        </>
    );
}

const validateForm = ({ name, email, password }) => {
    const validTitle = Validator.isString(title) && Validator.isLength(title, { min: 1, max: 256 });
    const validBody = Validator.isString(body) && Validator.isLength(body, { min: 1, max: 2048 });
    const post = {}
    if (validTitle && validBody) {
        post.title = title;
        post.body = body;
    } else return false;
    if (username && Validator.isLength(username, { min: 1, max: 64 })) post.username = username;
    return post;
}

export default SignUp;