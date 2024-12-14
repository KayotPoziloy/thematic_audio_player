import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {usePlaylists} from "./hooks/usePlaylists";
import Account from "./components/Account";
import {Routes} from "react-router";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";



function App() {
    const { selectedPlaylist } = usePlaylists();

    return (
        <>
            <Router>
                <div className="bg-image">
                    {selectedPlaylist && (
                        <img
                            src={selectedPlaylist.background}
                            alt={`${selectedPlaylist.name} pic`}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                zIndex: -1, // Фон за другими элементами
                            }}
                        />
                    )}
                </div>
                <div className="d-flex flex-column vh-100">
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
        </>
    );
}

export default App;
