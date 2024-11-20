import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {usePlaylists} from "./hooks/usePlaylists";

function App() {
    const {selectedPlaylist} = usePlaylists();

    return (
        <>
            <Router>
                <div className="bg-image vh-100">
                    {selectedPlaylist ? (
                        <img
                            src={selectedPlaylist.background}
                            alt={`${selectedPlaylist.name} pic`}
                        />
                    ) : (
                        <p>Выберите плейлист</p>
                    )}
                </div>
                <div className="d-flex flex-column vh-100">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </Router>
        </>
    );
}

export default App;
