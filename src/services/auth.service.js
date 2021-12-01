import axios from "axios";

const AUTH_API_URL = "http://localhost:8066/api/auth/";

class AuthService {

    login(username, password) {
        return axios
            .post(AUTH_API_URL + `signin?password=${password}&username=${username}`)
            .then(response => {
                console.log('response: ', response);
                if (response.data.response.token) {
                    this.updatedLocalStorage(response.data);
                } 
                return response.data;
            })
            // .catch(err => {
            //     if (err.response) {
            //         // client received an error response (5xx, 4xx)
            //         console.log("error: ", err.response.data);
            //         return Promise.reject(err.response.data);
            //       } else if (err.request) {
            //         // client never received a response, or request never left
            //         console.log("error: ", err);
            //         return err;
            //       } else {
            //         // anything else
            //         console.log("error: ", err);
            //         return err;
            //       }
            // })
    }

    logout() {
        localStorage.clear();

    }

    signUp(username, password, emailId) {
        return axios
            .post(AUTH_API_URL + `signup?email=${emailId}&password=${password}&newRole=ROLE_USER&username=${username}`);
    }

    updatedLocalStorage(data) {
        const userdetails = data.response;
        localStorage.setItem('username', userdetails.username);
        localStorage.setItem('access_token', userdetails.accessToken);
        localStorage.setItem('user_role', userdetails.roles[0]);
    }
}

export default new AuthService();