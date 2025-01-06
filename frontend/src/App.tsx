import React from "react";
import "./App.css"; // Обновлённый CSS файл
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { usePlaylists } from "./hooks/usePlaylists";
import Account from "./components/Account";
import { Routes } from "react-router";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
    const { selectedPlaylist } = usePlaylists();

    return (
        <div className="app-container">
            <Router>
                {selectedPlaylist && (
                    <div className="bg-image">
                        <img
                            src={selectedPlaylist.background}
                            alt={`${selectedPlaylist.name} pic`}
                        />
                    </div>
                )}
                <div className="main-layout">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Content />} />
                        <Route path="/account/*" element={<Account />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<SignUp />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;