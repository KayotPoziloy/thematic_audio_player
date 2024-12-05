import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../style_lk/Account.css"; // Подключение CSS для оформления
import UserHeader from "./Acc_components/UserHeader"; // Шапка профиля
import img1 from "./Acc_components/img/img_1.png"; // Импорт изображений
import img2 from "./Acc_components/img/img_2.png";
import img3 from "./Acc_components/img/img_3.png";
import img4 from "./Acc_components/img/img_4.png";
import img5 from "./Acc_components/img/img_5.png";
import imgDefault from "./Acc_components/img/img_6.png";

// Импорт компонентов для маршрутов
import Settings from "./Acc_components/Settings";
import Privacy from "./Acc_components/Privacy";
import Friends from "./Acc_components/Friends";
import Cooperation from "./Acc_components/Cooperation";
import Support from "./Acc_components/Support";
import Exit from "./Acc_components/Exit";




export default function Account() {
    const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // Состояние для фона
    const [avatarImage, setAvatarImage] = useState<string | null>(null); // Состояние для аватара

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
                                        src={imgDefault}
                                        alt="Настройки профиля"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">НАСТРОЙКИ ПРОФИЛЯ</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("products")}>
                                    <img
                                        src={img5}
                                        alt="Список друзей"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">СПИСОК ДРУЗЕЙ</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("help")}>
                                    <img
                                        src={img3}
                                        alt="Партнерство"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">ПАРТНЕРСТВО</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("support")}>
                                    <img
                                        src={img1}
                                        alt="Поддержка проекта"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">ПОДДЕРЖКА ПРОЕКТА</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("privacy")}>
                                    <img
                                        src={img4}
                                        alt="Авторские права"
                                        className="icon-image"
                                    />
                                    <p className="icon-label">АВТОРСКИЕ ПРАВА</p>
                                </div>
                                <div className="icon-item" onClick={() => navigate("favorites")}>
                                    <img
                                        src={img2}
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
                <Route path="favorites" element={<Exit />} />





            </Routes>
        </div>
    );
}
