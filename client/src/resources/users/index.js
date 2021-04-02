import axios from 'axios';

const API_BASE_URL = () => {
  switch (process.env.NODE_ENV) {
    case "dev":
      return "http://localhost:3000/api/";
    default:
      return "/api/"
  }
};

const REQUEST_INSTANCE = () => {
  return axios.create({
    baseURL: API_BASE_URL(),
    timeout: 30000,
    timeoutErrorMessage: "Couldn't reach the resources requested!"
  });
};

export default {
  async getAllUsers() {
    return REQUEST_INSTANCE().get("/users");
  },
  async getUserById(id) {
    return REQUEST_INSTANCE().get(`/users/${id}`);
  },
  async createUser(user) {
    return REQUEST_INSTANCE().post("/users", user);
  },
  async updateUser(id, user) {
    return REQUEST_INSTANCE().put(`/users/${id}`, user);
  },
  async deleteUser(id) {
    return REQUEST_INSTANCE().delete(`/users/${id}`);
  },
  async loginUser(user) {
    return REQUEST_INSTANCE().post("/users/login", user);
  }
}