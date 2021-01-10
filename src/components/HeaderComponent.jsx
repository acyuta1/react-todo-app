import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment } from "semantic-ui-react";
import AuthenticationService, {
  USER_NAME_SESSION_ATTRIBUTE,
} from "../components/AuthenticationService";
import { withRouter } from "react-router";

function HeaderComponent() {
  const isLoggedIn = AuthenticationService.isUserLoggedIn();
  let welcome = "";
  if (isLoggedIn) {
    welcome = "/welcome/" + sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
  }
  return (
    <div>
      <Segment
        clearing
        style={{ backgroundColor: "#5CDB89", textColor: "white" }}
      >
        <Header as="h3" floated="right">
          {!isLoggedIn && <Link to="/login">Login</Link>}
        </Header>
        <Header as="h3" floated="right">
          {isLoggedIn && (
            <Link to="/logout" onClick={AuthenticationService.successfulLogout}>
              Logout
            </Link>
          )}
        </Header>
        <Header as="h3" floated="left">
          {isLoggedIn && <Link to={welcome}>Home</Link>}
        </Header>
        <Header as="h3" floated="left">
          {isLoggedIn && <Link to="/todos">Todos</Link>}
        </Header>
      </Segment>
    </div>
  );
}
export default withRouter(HeaderComponent);
