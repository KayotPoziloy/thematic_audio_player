import React, {useEffect, useState, useRef} from "react";
import {useAudioPlayer} from "../../hooks/useAudioPlayer";
import {useDispatch, useSelector} from "react-redux";
import "./Playlists.scss";
import {usePlaylists} from "../../hooks/usePlaylists";
import {RootState} from "../../reducers";
import {setCurrentTime, setRotationAngle} from "../../reducers/audioSlice";

export const Playlists = () => {
    const {error, selectedPlaylist} = usePlaylists();
    const {isPlaying, duration} = useAudioPlayer();
    const dispatch = useDispatch();

    const {rotationAngle} = useSelector((state: RootState) => state.audio);

    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);


    // Обновление угла при воспроизведении
    useEffect(() => {
        if (!isDragging && isPlaying && duration > 0) {
            const interval = setInterval(() => {
                const newRotationAngle = (rotationAngle + 1) % 360;
                dispatch(setRotationAngle(newRotationAngle)); // Обновление угла в Redux
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isPlaying, duration, isDragging, rotationAngle, dispatch]); // Добавили dispatch как зависимость

    // Обработка начала перетаскивания
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    // Обработка перемещения мыши
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const newRotationAngle = ((angle * 180) / Math.PI + 360) % 360;

        // Перематываем трек в зависимости от угла
        const newTime = (newRotationAngle / 360) * duration;
        dispatch(setRotationAngle(newRotationAngle)); // Обновляем угол в Redux
        dispatch(setCurrentTime(newTime)); // Обновляем время в Redux
    };

    const handleMouseUp = () => {
        setIsDragging(false); // Завершаем перетаскивание
    };

    return (
        <div
            className="playlists"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {error && <p className="error">{error}</p>}

            {selectedPlaylist ? (
                <div className="playlist">
                    <div
                        ref={containerRef}
                        className="playlist-pic"
                        onMouseDown={handleMouseDown}
                        style={{
                            backgroundImage: `url(${selectedPlaylist.pic})`,
                            transform: `rotate(${rotationAngle}deg)`,
                            transition: isDragging ? "none" : "transform 0.05s linear",
                        }}
                    />
                    <h3>{selectedPlaylist.name}</h3>
                </div>
            ) : (
                <p>Выберите плейлист</p>
            )}
        </div>
    );
};
