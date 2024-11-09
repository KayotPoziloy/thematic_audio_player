import React, {useRef, useState} from "react";
import { startAudio, pauseAudio, resumeAudio } from "./audioControls";
import { tracks } from "../../service/tracks";

export const AudioPlayer = () => {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    startAudio(audio, tracks[currentTrackIndex]);
    setIsPlaying(true);
  };

  const handlePause = () => {
    pauseAudio(audio);
    setIsPlaying(false);
  };

  const handleResume = () => {
    resumeAudio(audio);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % tracks.length; // циклический переход к следующему треку
      startAudio(audio, tracks[nextIndex]);
      setIsPlaying(true);
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => {
      const previousIndex = (prevIndex - 1 + tracks.length) % tracks.length; // циклический переход к предыдущему треку
      startAudio(audio, tracks[previousIndex]);
      setIsPlaying(true);
      return previousIndex;
    });
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

