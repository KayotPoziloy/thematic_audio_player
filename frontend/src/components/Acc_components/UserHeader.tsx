import React from "react";
import "../../style_lk/Account.css";

type UserHeaderProps = {
    backgroundImage?: string | null;
    avatarImage?: string | null;
};

const UserHeader: React.FC<UserHeaderProps> = ({ backgroundImage, avatarImage }) => {
    return (
        <div
            className="account-top-section"
            style={{ backgroundImage: `url(${backgroundImage || ""})` }}
        >
            <div className="avatar-container">
                <img
                    src={avatarImage || "/png_lk/1.png"} // Используем импортированное изображение
                    alt="Аватар пользователя"
                    className="avatar"
                />
            </div>
            <div className="user-info">
                <h3>Имя: Иван</h3>
                <h4>Фамилия: Иванов</h4>
                <p>Email: ivanov@example.com</p>
                <p>Телефон: +7 (123) 456-78-90</p>
                <div className="icons">
                    <span>⭐</span>
                    <span>🔊</span>
                    <span>👥</span>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
