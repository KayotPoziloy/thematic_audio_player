import axios from 'axios';
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../../config";

export const signup =  (login: any, password: any, name:any, navigate:any ) => {
    return async (dispatch:any) => {
        try {
            const response = await axios.post(`${API_URL}api/user/signup`,  {
                login,
                password,
                name
            });
            navigate("/login");
        } catch (e: any) {
            return "Ошибка:" +e.response?.data?.error?.msg;
        }
    }
};

export const signin = (login: any, password: any, navigate:any) => {
    return async (dispatch: any) => {
        try {
            const response = await axios.post(`${API_URL}api/user/signin`, {
                login,
                password,
            });

            const token = response.data.token;
            if (token) {
                document.cookie = "token=" + token;
            }

            dispatch(setUser(response.data.login));
            navigate("/account");
        } catch (e: any) {
            return "Ошибка:" +e.response?.data?.error?.msg;
        }
    };
};
