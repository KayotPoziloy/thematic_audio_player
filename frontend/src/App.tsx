import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store/store";
import {fetchPlaylists} from "./store/playlistSlice";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {playlists, selectedPlaylistId} = useSelector((state: RootState) => state.playlist);

    const selectedPlaylist = playlists.find(
        (playlist) => playlist.id === selectedPlaylistId
    );

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);
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
                <div className="app d-flex flex-column vh-100">

                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </Router>
        </>
    );
}

export default App;
