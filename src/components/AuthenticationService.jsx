import axios from "axios";
import { BASE_API_URL } from "../Constants";

class AuthenticationService {
  executeJwtAuthenticationService(username, password) {
    return axios.post(`${BASE_API_URL}/auth/login`, {
      username,
      password,
    });
  }

  registerSuccessFulLoginForJWT(username, jwtToken) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username);
    sessionStorage.setItem(JWT_SESSION_ATTRIBUTE, "Bearer " + jwtToken);
  }

  successfulLogout() {
    sessionStorage.clear();
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE) === null
      ? false
      : true;
  }
}
export default new AuthenticationService();
export const USER_NAME_SESSION_ATTRIBUTE = "authenticatedUser";
export const JWT_SESSION_ATTRIBUTE = "jwt";
