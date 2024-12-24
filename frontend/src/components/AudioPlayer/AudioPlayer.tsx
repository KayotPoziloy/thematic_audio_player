import React, { useState } from "react";
import "./AudioPlayer.scss"
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

export const AudioPlayer = () => {
    const {
        audio,
        tracks,
        background,
        trackName,
        trackAuthor,
        isPlaying,
        currentTime,
        volume,
        handlePlayPause,
        handleNext,
        handlePrevious,
        handleVolumeChange,
    } = useAudioPlayer();

    const [show, setShow] = useState(false);

    return (
        <div className="footer-player">
            <div className="playlist-footer">
                {tracks.length > 0 && (
                    <div className="track-cover">
                        <img
                            src={background}
                            alt="Track Cover"
                            className="cover-image"
                        />
                    </div>
                )}
                <div className="track-name">
                    <p><b>{tracks.length > 0 && trackName}</b></p>
                    <p>{tracks.length > 0 && trackAuthor}</p>
                </div>
            </div>
            <div className="btn-group gap-2 d-md-block">
            <button className="btn" onClick={handlePrevious}>
                    <img className="footer-icon-img" src="../png/Back.png" alt="Previous"/>
                </button>
                <button
                    className="btn"
                    onClick={handlePlayPause}
                >
                    {isPlaying ? (
                        <img className="footer-icon-img" src="../png/Pause.png" alt="Pause"/>) : currentTime === 0 ? (
                        <img className="footer-icon-img" src="../png/Play.png" alt="Play"/>) : (
                        <img className="footer-icon-img" src="../png/Play.png" alt="Play"/>)}
                </button>
                <button className="btn " onClick={handleNext}>
                    <img className="footer-icon-img" src="../png/Next.png" alt="Next"/>
                </button>
                <button className="btn" onClick={() => setShow(!show)}>
                    <img className="footer-icon-img"
                         src="png/Volume.png" alt=""/>
                </button>
                {show && 
                <div className="volume-range">
                    <div className="wrapper">
                        <input 
                            id="volume" 
                            type="range" 
                            min="0"
                            max="1" 
                            step="0.01" 
                            value={volume} 
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>}
                <audio ref={audio}/>
            </div>
        </div>
    );
}

