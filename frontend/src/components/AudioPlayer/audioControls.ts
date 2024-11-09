import { RefObject } from "react";

export const startAudio = async (audio: React.RefObject<HTMLAudioElement>, audioUrl: string) => {
  if (!audio.current) return;

  try {
    audio.current.src = audioUrl;
    await audio.current.play();
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};

export const pauseAudio = (audio: RefObject<HTMLAudioElement>) => {
  if (audio.current) {
    audio.current.pause();
  }
};

export const resumeAudio = (audio: RefObject<HTMLAudioElement>) => {
  if (audio.current) {
    audio.current.play();
  }
};