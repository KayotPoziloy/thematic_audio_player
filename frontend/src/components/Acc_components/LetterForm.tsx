import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface LetterFormProps {
    onClose: () => void;
}

const LetterForm: React.FC<LetterFormProps> = ({ onClose }) => {
    const [message, setMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            message,
        };

        try {
            await emailjs.send(
                "iliev7236@gmail.com", // service_id
                "template_k5xmmgh", // template_id для этой формы
                templateParams,
                "WA8qUEajyb5-QylPj" // public key (user_id)
            );
            alert("Форма отправлена успешно!");
            onClose();
        } catch (error) {
            console.error("Ошибка отправки формы:", error);
            alert("Ошибка отправки формы. Попробуйте снова.");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>
                        ✖
                    </button>
                    <h3>Напишите нам!</h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <label htmlFor="message">Ваше сообщение:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Напишите, что вас интересует..."
                            required
                            rows={5} // Высота текстового поля
                        />
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LetterForm;