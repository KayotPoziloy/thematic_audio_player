import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {UserState} from "../redux/reducers/userReducer"
import {Dropdown} from "./DropdownMenu";
import Bugsnag from "@bugsnag/js";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector((state: { user: UserState }) => state.user.isAuth);

    // const handleLogout = async () => {
    //     try {
    //         await axios.get(`${API_URL}api/user/logout`, {
    //             withCredentials: true
    //         });
    //         document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    //         dispatch(logout());
    //         navigate("/login");
    //     } catch (e: unknown) {
    //         if (axios.isAxiosError(e) && e.response?.data?.error?.msg) {
    //             Bugsnag.notify(e.response.data.error.msg)
    //
    //             return "Ошибка: " + e.response.data.error.msg;
    //         }
    //         Bugsnag.notify("Произошла ошибка")
    //         return "Произошла ошибка";
    //     }
    //
    // };

    return (
        <header>
            <nav className="navbar bg-secondary bg-opacity-50">
                <Dropdown/>
                {!isAuth ? (
                    <>
                        <Link to="/" className="nav-link text-white me-3">Главная</Link>
                        <Link to="/login" className="nav-link text-white me-3">Вход</Link>
                        <Link to="/register" className="nav-link text-white me-3">Регистрация</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="nav-link text-white me-3">Главная</Link>
                        <Link to="/account" className="nav-link">
                            <img className="profile" src="/png/Profile.png" alt="Профиль"/>
                        </Link>
                    </>
                )}
                {/*{isAuth ? <button onClick={handleLogout} className="btn btn-danger ms-md-3">Выход</button> : null}*/}

            </nav>
        </header>
    );
}
