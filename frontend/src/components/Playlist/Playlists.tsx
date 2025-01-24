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
    const [mouseAngle, setMouseAngle] = useState([] as number[]);
    const [lastDuration, setLastDuration] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        if (duration)
            setLastDuration(duration);
    },[duration]);

    // Обновление угла при воспроизведении
    useEffect(() => {
        if (!isDragging && isPlaying) {
            const timeStart = +new Date();
            const interval = setTimeout(() => {
                const newRotationAngle = (rotationAngle + ((+new Date()) - timeStart)/50);
                dispatch(setRotationAngle(newRotationAngle)); // Обновление угла в Redux
            }, 50);
            return () => clearTimeout(interval);
        }
    }, [isPlaying, isDragging, rotationAngle, dispatch]); // Добавили dispatch как зависимость

    // Обработка начала перетаскивания
    const getAngle = (e: React.MouseEvent) => {
        if (!containerRef.current) return 0;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        return ((angle * 180) / Math.PI + 360) % 360;
    };

    
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setMouseAngle([getAngle(e)]);
        setIsDragging(true);
    };
    
    useEffect(() => {
        if (mouseAngle.length != 2) return;
        const newRotationAngle = Math.max(rotationAngle + mouseAngle[1] - mouseAngle[0], 0);

        // Перематываем трек в зависимости от угла
        const newTime = newRotationAngle * 50 / 1000;
        
        setMouseAngle(x=> [x[1]]);
        if (Math.abs(mouseAngle[1] - mouseAngle[0]) > 180) return;
        dispatch(setRotationAngle(newRotationAngle)); // Обновляем угол в Redux
        dispatch(setCurrentTime(newTime)); // Обновляем время в Redux
    }, [mouseAngle]);

    // Обработка перемещения мыши
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        const angle = getAngle(e);
        setMouseAngle(x => [x[0] || 0, angle]);
    };

    const handleMouseUp = () => {
        setIsDragging(false); // Завершаем перетаскивание
    };

    const progress = lastDuration ? Math.min((rotationAngle * 50 / 1000) / lastDuration, 1) : 1;

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
                        <svg version="1.1" width="100" height="100" viewBox="0 0 100 100" style={{height: '300px', width: '300px', position: 'absolute', top: '45px', left: '0px', pointerEvents: 'none'}}>
                            <circle cx="50" cy="50" r="49.166667" fill="none" stroke="#777" strokeWidth="1.666666"></circle>
                            <path d={`M 50 0.833333 A 49.166667 49.166667 0 ${progress>0.5?1:0} 1 ${Math.sin(progress*Math.PI*2)*49.166667+50} ${-Math.cos(progress*Math.PI*2)*49.166667+50}`} fill="none" stroke="#2c3737" strokeWidth="1.666666"></path>
                        </svg>
                    <h3>{selectedPlaylist.name}</h3>
                </div>
            ) : (
                <p>Выберите плейлист</p>
            )}
        </div>
    );
};
