import apiClient from "./axiosClient";
export default {
  register(user) {
    console.log(user);
    return apiClient
      .post("/registers", {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNo: user.phoneNo
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  sendMail() {
    return apiClient
    .post("/send-mail",{
      email: localStorage.getItem("user").email
    }).then((response) => {
      alert(response.data)
    })
  }
};
