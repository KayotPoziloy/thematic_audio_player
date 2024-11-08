import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../redux/reducers/userReducer";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector((state: any) => state.user.isAuth);
    const currentUser = useSelector((state: any) => state.user.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        if (localStorage.getItem("token") && !isAuth) {
        }
    }, [isAuth, currentUser, dispatch]);

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
