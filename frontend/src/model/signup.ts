import Bugsnag from "@bugsnag/js";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { API_URL } from "../config";

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