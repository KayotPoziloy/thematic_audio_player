import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Импорт компонента для верхнего меню
import Content from "./components/Content"; // Импорт главного содержимого
import Footer from "./components/Footer"; // Импорт компонента для футера
import Account from "./components/Account"; // Импорт страницы личного кабинета
import Settings from "./components/Acc_components/Settings"; // Импорт страницы настроек
import Privacy from "./components/Acc_components/Privacy"; // Импорт страницы конфиденциальности
import Friends from "./components/Acc_components/Friends"; // Импорт страницы списка друзей
import Help from "./components/Acc_components/Help"; // Импорт страницы помощи
import Support from "./components/Acc_components/Support"; // Импорт страницы поддержки проекта
import Favorites from "./components/Acc_components/Favorites"; // Импорт страницы избранного

function App() {
    return (
        <Router>
            <div className="App">
                <Header /> {/* Верхнее меню сайта */}

                <div className="content">
                    <Routes> {/* Определение маршрутов для разных страниц */}
                        <Route path="/" element={<Content />} /> {/* Главная страница */}
                        <Route path="/account" element={<Account />} /> {/* Личный кабинет */}
                        <Route path="/settings" element={<Settings />} /> {/* Настройки */}
                        <Route path="/privacy" element={<Privacy />} /> {/* Конфиденциальность */}
                        <Route path="/friends" element={<Friends />} /> {/* Список друзей */}
                        <Route path="/help" element={<Help />} /> {/* Помощь */}
                        <Route path="/support" element={<Support />} /> {/* Поддержка проекта */}
                        <Route path="/favorites" element={<Favorites />} /> {/* Избранное */}
                    </Routes>
                </div>

                <Footer /> {/* Нижнее меню сайта */}
            </div>
        </Router>
    );
}


export default App;
