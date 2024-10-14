import React, { useState, useRef } from "react";

export default function Main() {
    const audio = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const startAudio = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch("http://localhost:3000/audio");
=======
            const response = await fetch("http://localhost:5000/audio");
>>>>>>> 2cd988866308840d7969b2905d9a83c66ff86966
            if (!response.ok) {
                throw new Error("Error");
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            if (audio.current) {
                audio.current.src = audioUrl;
                audio.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };

    const stopAudio = () => {
        if (audio.current) {
            audio.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <main>
            <button className="btn btn-success" onClick={startAudio}>
                Start
            </button>
            <button className="btn btn-danger" onClick={stopAudio}>
                Stop
            </button>
            <audio ref={audio} />
        </main>
    );
}
