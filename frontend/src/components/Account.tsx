import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../style_lk/Account.css"; // Подключение CSS для оформления
import UserHeader from "./Acc_components/UserHeader"; // Шапка профиля

// Импорт компонентов для маршрутов
import Settings from "./Acc_components/Settings";
import Privacy from "./Acc_components/Privacy";
import Cooperation from "./Acc_components/Cooperation";
import Support from "./Acc_components/Support";
import { useHandleLogout } from "../model";
import Admin from "../admin/Admin";

export default function Account() {
    const navigate = useNavigate();
    const { handleLogout } = useHandleLogout();
    const [backgroundImage] = useState<string | null>(null);
    const [avatarImage] = useState<string | null>(null);

    return (
        <div className="account-container" style={{ position: "relative", zIndex: 1, paddingBottom: "10%"}}>
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
                                <div className="icon-item" onClick={() => navigate("admin")}>
                                    <img
                                        src="/png_lk/img_5.png"
                                        alt="АДМИН"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">АДМИН</p>
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
                <Route path="admin/*" element={<Admin />} />
                <Route path="help" element={<Cooperation />} />
                <Route path="support" element={<Support />} />
            </Routes>
        </div>
    );
}
