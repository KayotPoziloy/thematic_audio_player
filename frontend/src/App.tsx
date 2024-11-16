import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {fetchPlaylists} from "./store/playlistSlice";

// import {DropdownMenu, DropdownMenuFavourites} from "./components/DropdownMenu";

function App() {
    const dispatch = useDispatch<any>();
    const {playlists, error} = useSelector((state: RootState) => state.playlist);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);
    return (
        <>
            <Router>
                <div className="bg-image vh-100">
                    {playlists.map((playlist) => (
                        <img src={playlist.background} alt={`${playlist.name} pic`}/>
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
