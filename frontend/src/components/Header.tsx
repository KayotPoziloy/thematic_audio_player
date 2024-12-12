import React from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/reducers/userReducer";
import {API_URL} from "../config";
import axios from "axios";
import {UserState} from "../redux/reducers/userReducer"
import {Dropdown} from "./DropdownMenu";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPages = ["/register", "/login", "/account"];


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
            <nav className="navbar navbar-expand-lg bg-secondary bg-opacity-50">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-lg-auto">
                            <li className="nav-item"><Dropdown/></li>
                        </ul>
                        <ul className="navbar-nav">
                            {!isAuth ? (
                                <>
                                    {isAuthPages.includes(location.pathname) ? (
                                        <>
                                            <Link to="/" className="nav-link text-white me-3">
                                                <img className="logo"
                                                     src="/png/Vinyl.png"
                                                     alt="Главная"/>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/account" className="nav-link">
                                                <img className="logo" src="/png/Profile.png" alt="Профиль"/>
                                            </Link>
                                        </>
                                    )}
                                    <Link to="/login" className="nav-link text-white me-3">Вход</Link>
                                    <Link to="/register" className="nav-link text-white me-3">Регистрация</Link>
                                </>
                            ) : (
                                <>
                                    {isAuthPages.includes(location.pathname) ? (
                                        <>
                                            <Link to="/" className="nav-link nav-item">
                                                <img className="logo"
                                                     src="/png/Vinyl.png"
                                                     alt="Главная"/>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/account" className="nav-link nav-item" type="button">
                                                <img className="logo" src="/png/Profile.png" alt="Профиль"/>
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
