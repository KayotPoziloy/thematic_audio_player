import React from "react";
import "../../style_lk/Account.css";

interface UserHeaderProps {
    backgroundImage: string | null;
    avatarImage: string | null;
}

const UserHeader: React.FC<UserHeaderProps> = ({ backgroundImage, avatarImage }) => {
    return (
        <div
            className="account-top-section"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container d-flex align-items-center">
                <div className="avatar-container">
                    <img
                        src={avatarImage || "default-avatar-url.jpg"}
                        alt="Аватар пользователя"
                        className="avatar"
                    />
                </div>
                <div className="user-info ml-3">
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
        </div>
    );
};

export default UserHeader;
