import axios from "axios";

class HelloWorldService {
  retrieveMessage() {
    return axios.get("http://localhost:8080/api");
  }
}

export default new HelloWorldService();
