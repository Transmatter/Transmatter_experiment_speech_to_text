import apiClient from "./axiosClient";
import store from '@/store'

export default {
  login(user) {
    return apiClient
      .post("/auth", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        store.dispatch('setCurrentUser', response.data.user)
        store.dispatch('setRole', response.data.user.authorities[0])
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    store.dispatch('setCurrentUser', null)
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  //     hasRoles(roles) {
  //         if (GlobalStorage.currentUser && roles) {
  //           let containRoles = GlobalStorage.currentUser.authorities.filter((authority) => roles.includes(authority))
  //           if (containRoles.length > 0){
  //             return true
  //           }else{
  //             return false
  //           }

  //         } else {
  //           return false
  //         }
  // }
};
