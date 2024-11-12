import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"
import {
    fetchPlaylistTracks,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
} from "../../store/audioSlice";
import { startAudio } from "./audioControls";

export const AudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const dispatch = useDispatch();
    const [volume, setVolume] = useState(0.5);

    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        currentTime,
        error
    } = useSelector(
        (state: RootState) => state.audio
    );

    useEffect(() => {
        dispatch(fetchPlaylistTracks(1)); // Вставить id нужного плейлиста
    }, [dispatch]);

    useEffect(() => {
        if (tracks.length > 0) {
            if (isPlaying) {
                startAudio(audio, `http://localhost:5000/api/music/m/${tracks[currentTrackIndex].filename}`);
                if (audio.current) {
                    audio.current.currentTime = currentTime;
                    audio.current.play();
                }
            } else if (audio.current) {
                audio.current.pause();
            }
        }
    }, [tracks, currentTrackIndex, isPlaying, currentTime]);

    const handleStart = () => {
        dispatch(playTrack(currentTrackIndex));
    };

    const handlePause = () => {
        if (audio.current) {
            const currentTime = audio.current.currentTime;
            audio.current.pause();
            dispatch(pauseTrack(currentTime));
        }
    };

    const handleResume = () => {
        if (audio.current) {
            audio.current.play();
            dispatch(resumeTrack());
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
        <div>
            {tracks.length > 0 && (
                <div className="track-cover">
                    <img src={JSON.parse(tracks[currentTrackIndex].tag).background} width="100" height="100" alt="Track Cover" className="cover-image" />
                </div>
            )}
            <div>
                <h5>{ tracks.length > 0 && tracks[currentTrackIndex].author }</h5>
                <p>{ tracks.length > 0 && tracks[currentTrackIndex].name }</p>
            </div>
            <button className="btn btn-success" onClick={handleStart} disabled={isPlaying}>
                Start
            </button>
            <button className="btn btn-warning" onClick={handlePause} disabled={!isPlaying}>
                Pause
            </button>
            <button className="btn btn-info" onClick={handleResume} disabled={isPlaying}>
                Resume
            </button>
            <button className="btn btn-primary" onClick={handlePrevious}>
                Previous
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
                Next
            </button>
            <div>
                <label htmlFor="volume">Volume</label>
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
            <audio ref={audio}/>
        </div>
    );
}

