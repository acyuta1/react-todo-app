import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
function AuthenticatedRoute(props) {
  if (AuthenticationService.isUserLoggedIn()) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
}

export default AuthenticatedRoute;
