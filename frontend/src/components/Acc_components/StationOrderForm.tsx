import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./StationOrderForm.css"; // Подключаем стили

interface StationOrderFormProps {
    onClose: () => void;
}

const StationOrderForm: React.FC<StationOrderFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        stationName: "",
        songs: "",
        designNotes: "",
        email: "",
        phone: "",
        image: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("stationName", formData.stationName);
        formDataToSend.append("songs", formData.songs);
        formDataToSend.append("designNotes", formData.designNotes);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            await emailjs.sendForm(
                "service_id", // Замените на ваш ID сервиса
                "template_id", // Замените на ваш ID шаблона
                formDataToSend,
                "user_id" // Замените на ваш User ID из EmailJS
            );
            alert("Форма отправлена успешно!");
            onClose();
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
            alert("Ошибка отправки формы. Попробуйте снова.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                <h3>Анкета для сотрудничества</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Название станции:
                        <input
                            type="text"
                            name="stationName"
                            value={formData.stationName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Список песен для эфира:
                        <textarea
                            name="songs"
                            value={formData.songs}
                            onChange={handleInputChange}
                            placeholder="Например: Песня 1, Песня 2, Песня 3..."
                            required
                        />
                    </label>
                    <label>
                        Пожелания по оформлению станции:
                        <textarea
                            name="designNotes"
                            value={formData.designNotes}
                            onChange={handleInputChange}
                            placeholder="Опишите ваши пожелания"
                        />
                    </label>
                    <label>
                        Загрузить изображение:
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </label>
                    <label>
                        Электронная почта:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Номер телефона:
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default StationOrderForm;