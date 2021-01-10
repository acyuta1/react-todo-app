import React from "react";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./Welcome";
import TodosComponent from "./TodosComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import AuthenticatedRoute from "../../components/AuthenticatedRoute";
import TodoComponent from "./TodoComponent";
function TodoApp() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <AuthenticatedRoute
            path="/logout"
            exact
            component={LogoutComponent}
          />
          <AuthenticatedRoute path="/welcome/:name" exact component={Welcome} />
          <AuthenticatedRoute path="/todos" exact component={TodosComponent} />
          <AuthenticatedRoute
            path="/todos/:id"
            exact
            component={TodoComponent}
          />
          <Route component={ErrorComponent} />
        </Switch>
        <FooterComponent />
      </Router>
    </div>
  );
}

function ErrorComponent() {
  return <h1>Invalid URL</h1>;
}

export default TodoApp;
