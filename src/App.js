import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/authentication/login";
import SignUp from "./components/authentication/signup";
import Dashboard from "./components/posts/dashboard";
import Setting from "./components/posts/setting";
import Profile from "./components/posts/profile";

function App() {
  const Usertoken = localStorage.getItem("token");

  return (
    <div className="App">
      {!Usertoken ? (
        <Router>
          <Switch>
            <Route exact path="/logIn">
              <LogIn />
            </Route>
            <Route exact path="/signUp">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/setting">
              <Setting />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
