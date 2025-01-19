import React from 'react'
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import Actions from "./Actions";
import UploadMusic from "./UploadMusic";
import MusicList from "./MusicList";

export default function Admin(){
    return (
        <div style={{position:"relative", margin: '5px'}} className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Routes>
                <Route path="" element={<Actions/>}/>
                <Route path="upload" element={<UploadMusic/>}/>
                <Route path="musicList" element={<MusicList/>}/>
            </Routes>
        </div>
    );
}