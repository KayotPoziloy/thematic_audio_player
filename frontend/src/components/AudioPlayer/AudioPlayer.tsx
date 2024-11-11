import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"
import {
    loadTracks,
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
    const { tracks, currentTrackIndex, isPlaying, currentTime } = useSelector(
        (state: RootState) => state.audio
    )

    useEffect(() => {
        dispatch(loadTracks(["http://localhost:5000/api/music/m/audio.mp3"]));
    }, [dispatch]);

    useEffect(() => {
        if (tracks.length > 0) {
            if (isPlaying) {
                startAudio(audio, tracks[currentTrackIndex]);
                if (audio.current) {
                    audio.current.currentTime = currentTime; // Устанавливаем текущую позицию
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

    return (
        <div>
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
            <audio ref={audio}/>
        </div>
    );
}

