import instance from "../../components/AxiosIntercepted";
import { BASE_API_URL } from "../../Constants";

class TodoService {
  getAllTodosOfUser(username) {
    return instance.get(`${BASE_API_URL}/users/${username}/todos`);
  }

  getATodoOfUser(username, id) {
    return instance.get(`${BASE_API_URL}/users/${username}/todos/${id}`);
  }

  deleteATodoOfUser(username, id) {
    return instance.delete(`${BASE_API_URL}/users/${username}/todos/${id}`);
  }

  updateATodoOfUser(username, id, todo) {
    return instance.put(`${BASE_API_URL}/users/${username}/todos/${id}`, todo);
  }

  addATodo(username, todo) {
    return instance.post(`${BASE_API_URL}/users/${username}/todos`, todo);
  }
}

export default new TodoService();
