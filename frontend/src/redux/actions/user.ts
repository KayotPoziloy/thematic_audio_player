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
            alert(e.response?.data?.message || "An error occurred");
        }
    }
};

export const signin = (login: string, password: any, navigate:any) => {
    return async (dispatch: any) => {
        try {
            const response = await axios.post(`${API_URL}api/user/signin`, {
                login,
                password,
            });
            dispatch(setUser(response.data.login));
            localStorage.setItem('token', response.data.token);
            navigate("/account");
        } catch (e: any) {
            alert(e.response?.data?.message || "Alert error");
        }
    };
};

