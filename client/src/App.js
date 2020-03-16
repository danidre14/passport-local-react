import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import makeRequest from "./makeRequest";

import ControlRoute from "./Components/ControlRoute.jsx";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserPage from "./Components/UserPage";
import SignOut from "./Components/SignOut.js";

function Header(props) {
    const { username, loggedIn } = props.user;
    return (<div>            <Link to="/"> HomePage</Link> {!loggedIn ? <>|<Link to="/signup"> Sign Up</Link> |
        <Link to="/signin"> Sign In</Link></> : <><SignOut signOut={props.signOutUser} /> | <Link to="/users">Users Page</Link> | {username} </>}
    </div>);
}
function HomePage() {
    return (<h1>This is the home page!</h1>);
}

function RedirectHomePage() {
    return <Redirect to='/posts/view' />
}

function checkIfLoggedIn(setUser) {
    function fetchUser() {
        makeRequest([`/api/users`, "get"], {}, (data) => {
            if (data.message === "Success")
                setUser({ loggedIn: true, username: data.username });
        }, (message) => {
            alert("Error: Got error");
        })
    }


    fetchUser();
}

function App() {
    const [user, setUser] = useState({ loggedIn: false, username: null });
    function signOutUser() {
        setUser({ loggedIn: false, username: null });
    }

    useEffect(() => {
        checkIfLoggedIn(setUser);
    }, []);

    return (
        <Router>
            <Header signOutUser={signOutUser} user={user} />

            <div className="pt-10 pb-3 bg-ghostwhite">
                <Switch>
                    <ControlRoute key={1} path="/users" component={UserPage} />
                    <ControlRoute key={2} path="/signup" component={SignUp} />
                    <ControlRoute key={3} path="/signin" signInUser={setUser} component={SignIn} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;