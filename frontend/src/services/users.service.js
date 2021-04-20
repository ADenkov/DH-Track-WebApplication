import http from "../http-common";
import authHeader from "./auth-header";

class ClientDataService {

  findByUsername(username) {
    return http.get(`/user?username=${username}`, { headers: authHeader() });
  }

  getUserBoard = () => {
    return http.get(`user`, { headers: authHeader() });
  };
  
  getManagerBoard = () => {
    return http.get(`manager`, { headers: authHeader() });
  };

  getAll() {
    return http.get(`/user/all`, { headers: authHeader() });
  }

  getUserPass(email) {
    return http.get(`/user/${email}/getPass`, { headers: authHeader() });
  }

  get(email) {
    return http.get(`/user/${email}`, { headers: authHeader() });
  }

  create(data) {
    return http.post(`/user/add`, data, { headers: authHeader() });
  }

  update(email, data) {
    return http.put(`/user/${email}/update`, data, { headers: authHeader() });
  }

  delete(email) {
    return http.delete(`/user/${email}/delete`, { headers: authHeader() });
  }

  assignRiderPass(email, data) {
    return http.put(`/user/${email}/assignPass`, data, { headers: authHeader() });
  }

  createRiderPassApplication(data) {
    return http.post(`/riderPass/add`, data, { headers: authHeader() });
  }

  getAllRiderPasses() {
    return http.get(`/riderPass/all`, { headers: authHeader() });
  }

  getRiderPass(name) {
    return http.get(`/riderpass/${name}`, { headers: authHeader() });
  }

  getRiderPassByEmail(email) {
    return http.get(`/riderPass/byEmail/${email}`, { headers: authHeader() });
  }

  riderPassDecide(email, decision) {
    return http.put(`/riderPass/${email}/decide`, decision, { headers: authHeader() });
  }

  riderPassReject(name) {
    return http.put(`/riderPass/${name}/reject`, { headers: authHeader() });
  }

  addNewTicket(email, data) {
    return http.post(`/ticket/${email}/add`, data, { headers: authHeader() });
  }

  getAllTickets() {
    return http.get(`/ticket/all`, { headers: authHeader() });
  }
}

export default new ClientDataService();
