import React, { useEffect, useState } from "react";
import "./AudioPlayer.scss";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { setDuration } from "../../reducers/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../reducers/userReducer";
import { checkIfLiked, addLike, removeLike } from "../../model/likeMusic";
import {useLocation} from "react-router-dom";

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
        currentTrackIndex,
    } = useAudioPlayer();

    const [show, setShow] = useState(false);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector((state: { user: UserState }) => state.user.isAuth);
    const location=useLocation()

    const currentTrack = tracks[currentTrackIndex];

    const handleLike = async () => {
        if (liked) {
            // @ts-expect-error: ...
            await removeLike(currentTrack.id);
            setLiked(false);
        } else {
            // @ts-expect-error: ...
            await addLike(currentTrack.id, location);
            setLiked(true);
        }
    };

    useEffect(() => {
        const updateDuration = () => {
            if (audio.current) {
                const trackDuration = audio.current.duration;
                if (!isNaN(trackDuration)) {
                    dispatch(setDuration(trackDuration));
                }
            }
        };

        if (audio.current) {
            audio.current.addEventListener("loadedmetadata", updateDuration);
            return () => {
                audio.current?.removeEventListener("loadedmetadata", updateDuration);
            };
        }
    }, [audio, dispatch]);

    useEffect(() => {
        const checkLikedStatus = async () => {
            if (!currentTrack) return;

            // @ts-expect-error: ...
            const isLiked = await checkIfLiked(currentTrack.id);
            setLiked(isLiked);
        };

        checkLikedStatus();
    }, [currentTrack]);

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
                    <p><b>{trackName}</b></p>
                    <p>{trackAuthor}</p>
                </div>
            </div>
            <div className="btn-group gap-2 d-md-block">
                <button className="btn" onClick={handlePrevious}>
                    <img className="footer-icon-img" src="/png/Back.png" alt="Previous"/>
                </button>
                <button className="btn" onClick={handlePlayPause}>
                    {isPlaying ? (
                        <img className="footer-icon-img" src="/png/Pause.png" alt="Pause"/>
                    ) : currentTime === 0 ? (
                        <img className="footer-icon-img" src="/png/Play.png" alt="Play"/>
                    ) : (
                        <img className="footer-icon-img" src="/png/Play.png" alt="Play"/>
                    )}
                </button>
                <button className="btn" onClick={handleNext}>
                    <img className="footer-icon-img" src="/png/Next.png" alt="Next"/>
                </button>
                <button className="btn" onClick={() => setShow(!show)}>
                    <img className="footer-icon-img" src="/png/Volume.png" alt=""/>
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
                    </div>
                }

                {isAuth && (
                    liked ? (
                        <button
                            className="btn"
                            onClick={handleLike}
                            style={{ visibility: 'hidden', pointerEvents: 'none' }}
                        >
                            <img
                                className="footer-icon-img"
                                src="/png/Heart.png"
                                alt="Liked"
                            />
                        </button>
                    ) : (
                        <button className="btn" onClick={handleLike}>
                            <img className="footer-icon-img" src="/png/Heart.png" alt="Like" />
                        </button>
                    )
                )}

                <audio ref={audio}/>
            </div>
        </div>
    );
}
