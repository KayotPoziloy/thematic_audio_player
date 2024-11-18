import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../store/store"
import {
    fetchPlaylistTracks,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
} from "../../store/audioSlice";
import "./AudioPlayer.scss"
import { saveAudioState } from "../../utils/localStorage";

export const AudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [volume, setVolume] = useState(0.5);
    const [show, setShow] = useState(false);
    const {selectedPlaylistId} = useSelector((state: RootState) => state.playlist);

    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        currentTime,
    } = useSelector(
        (state: RootState) => state.audio
    );

    useEffect(() => {
        dispatch(fetchPlaylistTracks(selectedPlaylistId));
    }, [dispatch]);

    useEffect(() => {
        if (tracks.length > 0) {
            const currentTrack = tracks[currentTrackIndex];

            if (audio.current) {
                audio.current.src = `http://localhost:5000/api/music/m/${currentTrack.filename}`;
                audio.current.currentTime = currentTime;

                if (isPlaying) {
                    const playAudio = async () => {
                        try {
                            await audio.current?.play();
                        } catch (error) {
                            console.error("Error playing audio:", error);
                        }
                    };

                    audio.current.addEventListener("loadeddata", playAudio);

                    return () => {
                        audio.current?.removeEventListener("loadeddata", playAudio);
                    };
                } else {
                    audio.current.pause();
                }
            }
        }
    }, [tracks, currentTrackIndex, isPlaying, currentTime]);

    useEffect(() => {
        saveAudioState({
            currentTrackIndex,
            currentTime,
            isPlaying,
        });
    }, [currentTrackIndex, currentTime, isPlaying]);

    const handlePlayPause = () => {
        if (!isPlaying && currentTime === 0) {
            dispatch(playTrack(currentTrackIndex));
        } else if (isPlaying) {
            if (audio.current) {
                const currentTime = audio.current.currentTime;
                audio.current.pause();
                dispatch(pauseTrack(currentTime));
            }
        } else {
            if (audio.current) {
                audio.current.play();
                dispatch(resumeTrack());
            }
        }
    };

    const handleNext = () => {
        dispatch(nextTrack());
    };

    const handlePrevious = () => {
        dispatch(previousTrack());
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio.current) {
            audio.current.volume = newVolume;
        }
    }

    return (
        <div className="footer-player">
            <div className="playlist-footer">
                {tracks.length > 0 && (
                    <div className="track-cover">
                        <img
                            src={JSON.parse(tracks[currentTrackIndex].tag).background}
                            alt="Track Cover"
                            className="cover-image"
                        />
                    </div>
                )}

                <div className= "track-name">
                    <p>{tracks.length > 0 && tracks[currentTrackIndex].author}</p>
                    <p>{tracks.length > 0 && tracks[currentTrackIndex].name}</p>
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
                {show && <div className="volume-range">
                    <div className="wrapper"><input
                        id="volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    /></div>
                </div>}
                <audio ref={audio}/>
            </div>
        </div>
    );
}

