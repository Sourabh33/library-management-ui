import axios from "axios";

const AUTH_API_URL = "http://localhost:8066/api/auth/";

class AuthService {

    login(username, password) {
        return axios
            .post(AUTH_API_URL + `signin?password=${password}&username=${username}`)
            .then(response => {
                console.log('response: ', response);
                if (response.data) {
                    this.updatedLocalStorage(response.data);
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.log("error: ", err.response.data.message);
                return err.response.data.message;
            })
    }

    logout() {

    }

    signUp(username, password, emailId) {
        return axios
            .post(AUTH_API_URL + `signup?email=${emailId}&password=${password}&newRole=ROLE_USER&username=${username}`)
            .then(response => {
                console.log('response: ', response);
                return response.data ? response.data : null;
               
            })
            .catch(err=> {
                console.log("error: ", err.response.data.message);
                return err.response.data.message;
            })
    }

    updatedLocalStorage(data) {
        const userdetails = data.response;
        localStorage.setItem('username', userdetails.username);
        localStorage.setItem('access_token', userdetails.accessToken);
        localStorage.setItem('user_role', userdetails.roles[0]);
    }
}

export default new AuthService();