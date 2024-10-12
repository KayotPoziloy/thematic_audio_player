import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header
            className="bg-primary text-white d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
            <nav className="d-flex flex-column flex-md-row">
                <Link to="/" className="nav-link text-white me-3">Избранное</Link>
                <Link to="/" className="nav-link text-white me-3">Главная</Link>
                <Link to="/login" className="nav-link text-white me-3">Вход</Link>
                <Link to="/register" className="nav-link text-white me-3">Регистрация</Link>
                <Link to="/account" className="nav-link text-white">Аккаунт</Link>
            </nav>
        </header>
    );
}