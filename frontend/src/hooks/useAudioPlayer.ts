import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers";
import {
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
} from "../reducers/audioSlice";
import { fetchPlaylistTracks, getTrackUrl } from "../model";
import { saveAudioState } from "../utils/localStorage";

export const useAudioPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [volume, setVolume] = useState(0.5);
    const {selectedPlaylistId} = useSelector((state: RootState) => state.playlist);
    const [duration, setDuration] = useState<number>(0);

    const {
        tracks,
        currentTrackIndex,
        isPlaying,
        currentTime,
    } = useSelector(
        (state: RootState) => state.audio
    );

    const background = tracks[currentTrackIndex]?.background;
    const trackName = tracks[currentTrackIndex]?.name;
    const trackAuthor = tracks[currentTrackIndex]?.author;

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

    useEffect(() => {
        if (selectedPlaylistId) {
            dispatch(fetchPlaylistTracks(selectedPlaylistId));
        }
    }, [selectedPlaylistId, dispatch]);

    useEffect(() => {
        if (audio.current) {
            const handleTrackEnd = () => {
                dispatch(nextTrack());

                setTimeout(() => {
                    if (audio.current) {
                        try {
                            audio.current.play();
                        } catch (error) {
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

    useEffect(() => {
        if (tracks.length > 0) {
            const currentTrack = tracks[currentTrackIndex];
            const trackUrl = getTrackUrl(currentTrack.filename);

            if (audio.current) {
                audio.current.src = trackUrl;
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
    
    return {
        audio,
        tracks,
        background,
        trackName,
        trackAuthor,
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
