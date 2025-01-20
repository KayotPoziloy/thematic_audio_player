import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserState} from "../reducers/userReducer"
import {Dropdown} from "./DropdownMenu";


export default function Header() {
    const location = useLocation();
    const isAuthPages = ["/register", "/login", "/account"];
    const isAuth = useSelector((state: { user: UserState }) => state.user.isAuth);

    return (
        <header className={"sticky-top"}>
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
