import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../redux/reducers";
import {
    fetchPlaylistTracks,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
} from "../redux/reducers/audioSlice";
import { saveAudioState } from "../utils/localStorage";
import Bugsnag from "@bugsnag/js";
import {API_URL} from "../config";

export const useAudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [volume, setVolume] = useState(0.5);
    const {selectedPlaylistId} = useSelector((state: RootState) => state.playlist);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const updateDuration = () => {
            if (audio.current) {
                const trackDuration = audio.current.duration;
                if (!isNaN(trackDuration)) {
                    setDuration(trackDuration);
                }
            }
        };

        if (audio.current) {
            audio.current.addEventListener("loadedmetadata", updateDuration);
            return () => {
                audio.current?.removeEventListener("loadedmetadata", updateDuration);
            };
        }
    }, []);


    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        currentTime,
    } = useSelector(
        (state: RootState) => state.audio
    );

    // Выборка треков для текущего плейлиста
    useEffect(() => {
        if (selectedPlaylistId) {
            dispatch(fetchPlaylistTracks(selectedPlaylistId));
        }
    }, [selectedPlaylistId, dispatch]);

    // Переключение трека после окончания
    useEffect(() => {
        if (audio.current) {
            const handleTrackEnd = () => {
                dispatch(nextTrack());

                setTimeout(() => {
                    if (audio.current) {
                        try {
                            audio.current.play();
                        } catch (error) {
                            Bugsnag.notify(error as Error)
                            console.error("Error playing next track:", error);
                        }
                    }
                }, 0);
            };

            audio.current.addEventListener("ended", handleTrackEnd);

            return () => {
                audio.current?.removeEventListener("ended", handleTrackEnd);
            };
        }
    }, [dispatch]);

    // Загрузка трека, который играет
    useEffect(() => {
        if (tracks.length > 0) {
            const currentTrack = tracks[currentTrackIndex];

            if (audio.current) {
                audio.current.src = API_URL + `api/music/m/${currentTrack.filename}`;
                audio.current.currentTime = currentTime;

                if (isPlaying) {
                    const playAudio = async () => {
                        try {
                            await audio.current?.play();
                        } catch (error) {
                            Bugsnag.notify(error as Error)
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

    // Сохранение состояния трека в local storage
    useEffect(() => {
        saveAudioState({
            currentTrackIndex,
            currentTime,
            isPlaying,
            currentPlaylistIndex: selectedPlaylistId,
        });
    }, [currentTrackIndex, currentTime, isPlaying, selectedPlaylistId]);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent ) => {
            switch (e.code) {
                case "MediaPlayPause":
                case "KeyP":
                case "Space":
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case "MediaTrackNext":
                case "ArrowRight":
                case "KeyL":
                    handleNext();
                    break;
                case "MediaTrackPrevious":
                case "ArrowLeft":
                case "KeyJ":
                    handlePrevious();
                    break;
                case "ArrowUp":
                case "KeyI":
                    setVolume((prev) => {
                        const newVolume = Math.min(prev + 0.1, 1);
                        if (audio.current) audio.current.volume = newVolume;
                        return newVolume;
                    });
                    break;
                case "ArrowDown":
                case "KeyK":
                    setVolume((prev) => {
                        const newVolume = Math.max(prev - 0.1, 0);
                        if (audio.current) audio.current.volume = newVolume;
                        return newVolume;
                    });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePlayPause, handleNext, handlePrevious]);

    return {
        audio,
        tracks,
        currentTrackIndex,
        isPlaying,
        currentTime,
        volume,
        duration,
        handlePlayPause,
        handleNext,
        handlePrevious,
        handleVolumeChange,
    };
}