import React from "react";
import {Dropdown} from "./DropdownMenu";
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
        <header>
            <nav className="navbar bg-secondary bg-opacity-50">
                <Dropdown/>
                <ul className="nav justify-content-end">
                    <li className="nav-item"><Link to="/account" className="nav-link"><img className="profile" src="/png/Profile.png" alt="Профиль"/></Link></li>
                </ul>
                {!isAuth ? (
                    <>
                        <Link to="/" className="nav-link text-white me-3">Главная</Link>
                        <Link to="/login" className="nav-link text-white me-3">Вход</Link>
                        <Link to="/register" className="nav-link text-white me-3">Регистрация</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="nav-link text-white me-3">Главная</Link>
                        <Link to="/account" className="nav-link text-white me-3">Аккаунт</Link>
                        <Link to="/" className="nav-link text-white me-3">Избранное</Link>
                    </>
                )}
            </nav>
            {isAuth ? <button onClick={handleLogout} className="btn btn-danger ms-md-3">Выход</button> : null}
        </header>
    );
}
