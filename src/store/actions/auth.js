import axios from 'axios';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDN4au2HO21DBwrDn9QQ4bc5-M1HA3c51Y'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDN4au2HO21DBwrDn9QQ4bc5-M1HA3c51Y'
        }

        const response = await axios.post(url, authData);
        console.log(response.data)
    }
}