import React, { useEffect, useState } from "react";
import "../../style_lk/Account.css";
import axios from "axios";

type UserHeaderProps = {
    backgroundImage?: string | null;
    avatarImage?: string | null;
    userName?: string;
};

type UserData = {
    name: string;
    login: string;
    avatar_url?: string | null; // Аватарка с сервера
    background_url?: string | null; // Шапка с сервера
};

// Функция для получения данных пользователя с сервера
export async function fetchUserData() {
    try {
        const response = await axios.get("http://localhost:4000/api/user/info", {
            withCredentials: true, // Для использования куки
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        throw error;
    }
}

const UserHeader: React.FC<UserHeaderProps> = ({ backgroundImage, avatarImage, userName }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                const data = await fetchUserData();
                setUser(data);
            } catch {
                console.error("Не удалось загрузить данные пользователя.");
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div
            className="account-top-section"
            style={{
                backgroundImage: `url(${backgroundImage || user?.background_url || "/default_background.png"})`,
            }}
        >
            <div className="avatar-container">
                <img
                    src={avatarImage || user?.avatar_url || "/png_lk/1.png"}
                    alt="Аватар пользователя"
                    className="avatar"
                />
            </div>
            <div className="user-info">
                <h3>{userName || user?.name || "Неизвестно"}</h3>
                <p>{user?.login || "Неизвестно"}</p>
            </div>
        </div>
    );
};

export default UserHeader;
