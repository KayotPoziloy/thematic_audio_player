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


const isDarkImage = (imageUrl: string, callback: (isDark: boolean) => void) => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const brightness = (r + g + b) / 3; // Средняя яркость пикселя
            totalBrightness += brightness;
            pixelCount++;
        }

        const averageBrightness = totalBrightness / pixelCount;
        callback(averageBrightness < 128); // Если темнее 128, считаем картинку темной
    };
};

const UserHeader: React.FC<UserHeaderProps> = ({ backgroundImage, avatarImage, userName }) => {

    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTextDark, setIsTextDark] = useState<boolean>(false); // Флаг цвета текста

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

    useEffect(() => {
        const bgImage = backgroundImage || user?.background_url || "/default_background.png";
        if (bgImage) {
            isDarkImage(bgImage, setIsTextDark);
        }
    }, [backgroundImage, user?.background_url]);

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
            <div
                className="user-info"
                style={{
                    color: isTextDark ? "white" : "black",
                }}
            >
                <div className="username-container">
                    <h3>{userName || user?.name || "Неизвестно"}</h3>
                    <p>{user?.login || "Неизвестно"}</p>
                </div>
                <div className="icons">
                {/* <span>⭐</span> */}
                    {/* <span>🔊</span> */}
                    {/* <span>👥</span> */}
                </div>

            </div>
        </div>
    );
};

export default UserHeader;

