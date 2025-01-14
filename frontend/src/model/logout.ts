import axios from "axios";
import { API_URL } from "../config";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useHandleLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}api/user/logout`, {
                withCredentials: true,
            });
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            dispatch(logout());
            navigate("/login");
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response?.data?.error?.msg) {
                return "Ошибка: " + e.response.data.error.msg;
            }
            return "Произошла ошибка";
        }
    };

    return { handleLogout };
}

