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
    const {playlists} = useSelector((state: RootState) => state.playlist);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);
    return (
        <>
            <Router>
                <div className="bg-image vh-100">
                    {playlists.map((playlist, index) => (
                        <img src={playlist.background} key={index} alt={`${playlist.name} pic`}/>
                    ))};
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
