import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../style_lk/StationOrderForm.css";

interface StationOrderFormProps {
    onClose: () => void;
}

const StationOrderForm: React.FC<StationOrderFormProps> = ({ onClose }) => {
    const formRef = useRef<HTMLFormElement | null>(null); // Референс для формы
    const [formData, setFormData] = useState({
        stationName: "",
        songs: "",
        designNotes: "",
        email: "",
        image: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) {
            console.error("Форма не найдена");
            return;
        }

        try {
            await emailjs.sendForm(
                "iliev7236@gmail.com", // service_id
                "template_5bj1k92", // template_id
                formRef.current,
                "WA8qUEajyb5-QylPj" //user_id
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
                <form ref={formRef} onSubmit={handleSubmit}>
                    <label htmlFor="stationName">Название станции:</label>
                    <input
                        id="stationName"
                        type="text"
                        name="stationName"
                        value={formData.stationName}
                        onChange={handleInputChange}
                        required
                    />


                        <label htmlFor="songs">Список песен для трансляции:</label>
                        <textarea
                            id="songs"
                            name="songs"
                            value={formData.songs}
                            onChange={handleInputChange}
                            placeholder="Например: Песня 1, Песня 2, Песня 3..."
                            required
                        />



                        <label htmlFor="designNotes">Пожелания по оформлению станции:</label>
                        <textarea
                            id="designNotes"
                            name="designNotes"
                            value={formData.designNotes}
                            onChange={handleInputChange}
                            placeholder="Опишите ваши пожелания"
                        />



                        <label htmlFor="email">Электронная почта для дальнейшего сотрудничества (после заполнения анкеты с Вами свяжется администратор):</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />


                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default StationOrderForm;
