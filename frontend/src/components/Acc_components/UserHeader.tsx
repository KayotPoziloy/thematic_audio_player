import React from "react";
import "../../style_lk/Account.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

type UserHeaderProps = {
    backgroundImage?: string | null;
    avatarImage?: string | null;
};

const UserHeader: React.FC<UserHeaderProps> = ({ backgroundImage, avatarImage }) => {
    const { currentUser, isAuth } = useSelector((state: RootState) => state.user);

    return (
        <div
            className="account-top-section"
            style={{ backgroundImage: `url(${backgroundImage || ""})` }}
        >
            <div className="avatar-container">
                <img
                    src={avatarImage || "/png_lk/1.png"}
                    alt="Аватар пользователя"
                    className="avatar"
                />
            </div>
            <div className="user-info">
                <h3>Имя: {`${currentUser || "Неизвестно"}`}</h3>
                <p>Email: {isAuth ? "Электронная почта доступна" : "Электронная почта недоступна"}</p>
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
