import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../style_lk/Account.css"; // Подключение CSS для оформления
import UserHeader from "./Acc_components/UserHeader"; // Шапка профиля

// Импорт компонентов для маршрутов
import Settings from "./Acc_components/Settings";
import Privacy from "./Acc_components/Privacy";
import Friends from "./Acc_components/Friends";
import Cooperation from "./Acc_components/Cooperation";
import Support from "./Acc_components/Support";
import axios from "axios";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { API_URL } from "../config";
import Bugsnag from "@bugsnag/js";

export default function Account() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [backgroundImage] = useState<string | null>(null); // Состояние для фона
    const [avatarImage] = useState<string | null>(null); // Состояние для аватара

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
                Bugsnag.notify(e.response.data.error.msg);
                return "Ошибка: " + e.response.data.error.msg;
            }
            Bugsnag.notify("Произошла ошибка");
            return "Произошла ошибка";
        }
    };

    return (
        <div className="account-container" style={{ position: "relative", zIndex: 1 }}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <UserHeader
                                backgroundImage={backgroundImage}
                                avatarImage={avatarImage}
                            />
                            <div className="icon-grid">
                                <div className="icon-item" onClick={() => navigate("settings")}>
                                    <img
                                        src="/png_lk/img_6.png"
                                        alt="Настройки профиля"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">НАСТРОЙКИ ПРОФИЛЯ</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("friends")}>
                                    <img
                                        src="/png_lk/img_5.png"
                                        alt="Список друзей"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">СПИСОК ДРУЗЕЙ</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("help")}>
                                    <img
                                        src="/png_lk/img_3.png"
                                        alt="Партнерство"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">ПАРТНЕРСТВО</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("support")}>
                                    <img
                                        src="/png_lk/img_1.png"
                                        alt="Поддержка проекта"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">ПОДДЕРЖКА ПРОЕКТА</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("privacy")}>
                                    <img
                                        src="/png_lk/img_4.png"
                                        alt="Авторские права"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">АВТОРСКИЕ ПРАВА</p>
                                </div>
                                {/* Кнопка выхода с обработчиком */}
                                <div className="icon-item" onClick={handleLogout}>
                                    <img
                                        src="/png_lk/img_2.png"
                                        alt="Выход из аккаунта"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">ВЫХОД ИЗ АККАУНТА</p>
                                </div>
                            </div>
                        </>
                    }
                />
                <Route
                    path="settings"
                    element={
                        <>
                            <UserHeader
                                backgroundImage={backgroundImage}
                                avatarImage={avatarImage}
                            />
                            <Settings />
                        </>
                    }
                />
                <Route path="privacy" element={<Privacy />} />
                <Route path="friends" element={<Friends />} />
                <Route path="help" element={<Cooperation />} />
                <Route path="support" element={<Support />} />
            </Routes>
        </div>
    );
}
