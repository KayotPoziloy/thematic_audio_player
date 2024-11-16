import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style_lk/Account.css";
import UserHeader from "./Acc_components/UserHeader";
import img1 from "./Acc_components/img/img_1.png";
import img2 from "./Acc_components/img/img_2.png";
import img3 from "./Acc_components/img/img_3.png";
import img4 from "./Acc_components/img/img_4.png";
import img5 from "./Acc_components/img/img_5.png";
import imgDefault from "./Acc_components/img/img_6.png";

export default function Account() {
    const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    return (
        <div>
            {/* Шапка профиля */}
            <UserHeader backgroundImage={backgroundImage} avatarImage={avatarImage} />

            {/* Сетка кнопок */}
            <div className="icon-grid">
                <div className="icon-item" onClick={() => navigate("/settings")}>
                    <img src={imgDefault} alt="Настройки профиля" className="icon-image" />
                    <p className="icon-label">НАСТРОЙКИ ПРОФИЛЯ</p>
                </div>
                <div className="icon-item" onClick={() => navigate("/friends")}>
                    <img src={img5} alt="Список друзей" className="icon-image" />
                    <p className="icon-label">СПИСОК ДРУЗЕЙ</p>
                </div>
                <div className="icon-item" onClick={() => navigate("/help")}> {/* cooperation */}
                    <img src={img3} alt="Партнерство" className="icon-image" />
                    <p className="icon-label">ПАРТНЕРСТВО</p>
                </div>
                <div className="icon-item" onClick={() => navigate("/support")}>
                    <img src={img1} alt="Поддержка проекта" className="icon-image" />
                    <p className="icon-label">ПОДДЕРЖКА ПРОЕКТА</p>
                </div>
                <div className="icon-item" onClick={() => navigate("/privacy")}>
                    <img src={img4} alt="Авторские права" className="icon-image" />
                    <p className="icon-label">АВТОРСКИЕ ПРАВА</p>
                </div>
                <div className="icon-item" onClick={() => navigate("/favorites")}> {/*exit*/}
                    <img src={img2} alt="Выход из аккаунта" className="icon-image" />
                    <p className="icon-label">ВЫХОД ИЗ АККАУНТА</p>
                </div>
            </div>
        </div>
    );
}
