export const saveAudioState = (state: {
    currentTrackIndex: number;
    currentTime: number;
    isPlaying: boolean;
    currentPlaylistIndex: number;
}) => {
    localStorage.setItem("audioState", JSON.stringify(state));
};

export const loadAudioState = () => {
    const state = localStorage.getItem("audioState");
    return state ? JSON.parse(state) : null;
};