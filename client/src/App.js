import React from "react";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// import { Container } from "react-bootstrap";

import MiddleWare from "./Components/MiddleWare.jsx";
import CoatedWare from "./Components/CoatedWare.jsx";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import UserPage from "./Components/UserPage";

function Header() {
    return (<div>            <Link to="/"> HomePage</Link> |<Link to="/signup"> Sign Up</Link> |
        <Link to="/signin/2?rd=34&tg=2"> Sign In</Link> | <Link to="/users">Users</Link>
    </div>);
}
function HomePage() {
    return (<h1>This is the home page!</h1>);
}

function RedirectHomePage() {
    return <Redirect to='/posts/view' />
}

function App() {
    return (
        <Router>
            <Header />

            <div className="pt-10 pb-3 bg-ghostwhite">
                {/* <Container> */}
                {/* <Route component={MiddleWare} /> */}
                <Switch>
                    {/* <Route path="/users" component={UserPage} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signin" component={SignIn} /> */}
                    <Route path="/users" render={(props) => <CoatedWare key={1} {...props}><UserPage {...props} /></CoatedWare>} />
                    <Route path="/signup" render={(props) => <CoatedWare key={2} {...props}><SignUp {...props} /></CoatedWare>} />
                    <Route path="/signin" render={(props) => <CoatedWare key={3} {...props}><SignIn {...props} /></CoatedWare>} />
                    <Route path="/" component={HomePage} />
                    {/* <Route path="/" render={(props) => <CoatedWare key={4} {...props}><HomePage /></CoatedWare>} /> */}
                </Switch>
                {/* </Container> */}
            </div>
        </Router>
    );
}

export default App;