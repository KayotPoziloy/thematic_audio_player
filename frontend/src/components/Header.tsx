import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/reducers/userReducer";
import {API_URL} from "../config";
import axios from "axios";
import {UserState} from "../redux/reducers/userReducer"

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector((state: { user: UserState }) => state.user.isAuth);

    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}api/user/logout`, {
                withCredentials: true
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

    return (
        <header
            className="bg-primary text-white d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
            <nav className="d-flex flex-column flex-md-row">
                <Link to="/" className="nav-link text-white me-3">Избранное</Link>

                {!isAuth ? (
                    <>
                        <Link to="/login" className="nav-link text-white me-3">Вход</Link>
                        <Link to="/register" className="nav-link text-white me-3">Регистрация</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="nav-link text-white me-3">Главная</Link>
                        <Link to="/account" className="nav-link text-white me-3">Аккаунт</Link>
                    </>
                )}
            </nav>
            <button onClick={handleLogout} className="btn btn-danger ms-md-3">Выход</button>
        </header>
    );
}
