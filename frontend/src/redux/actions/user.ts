import axios from 'axios';
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../../config";
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import Bugsnag from "@bugsnag/js";

export const signup =  (login: string, password: string, name:string, navigate:NavigateFunction) => {
    return async () => {
        try {
            await axios.post(`${API_URL}api/user/signup`,  {
                login,
                password,
                name
            });
            navigate("/login");
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.error?.msg) {
                Bugsnag.notify(e.response.data.error.msg)
                return "Ошибка: " + e.response.data.error.msg;
            }
            Bugsnag.notify("Произошла ошибка")
            return "Произошла ошибка";
        }
    }
};

export const signin = (login: string, password: string, navigate:NavigateFunction) => {
    return async (dispatch: Dispatch) => {
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
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.error?.msg) {
                Bugsnag.notify(e.response.data.error.msg)
                return "Ошибка: " + e.response.data.error.msg;
            }
            Bugsnag.notify("Произошла ошибка")
            return "Произошла ошибка";
        }
    };
};
