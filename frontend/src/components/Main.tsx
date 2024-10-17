import React, { useRef } from "react";

export default function Main() {
    const audio = useRef<HTMLAudioElement | null>(null);

    const startAudio = async () => {
        try {
            const response = await fetch("http://localhost:5000/audio");
            if (!response.ok) {
                throw new Error("Error");
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            audio.current!.src = audioUrl;
            audio.current!.play();

        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };

    const stopAudio = () => {
        audio.current!.pause();
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
