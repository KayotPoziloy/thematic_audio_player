import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
    tracks: string[];
    currentTrackIndex: number;
    isPlaying: boolean;
    currentTime: number;
}

const initialState: AudioState = {
    tracks: [],
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
};

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        loadTracks: (state, action: PayloadAction<string[]>) => {
            state.tracks = action.payload;
        },
        playTrack: (state, action: PayloadAction<number>) => {
            state.currentTrackIndex = action.payload;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        pauseTrack: (state, action: PayloadAction<number>) => {
            state.isPlaying = false;
            state.currentTime = action.payload;
        },
        resumeTrack: (state) => {
            state.isPlaying = true;
        },
        nextTrack: (state) => {
            state.currentTrackIndex =
                (state.currentTrackIndex + 1) % state.tracks.length;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        previousTrack: (state) => {
            state.currentTrackIndex =
                (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
            state.isPlaying = true;
            state.currentTime = 0;
        },
    }
})

export const { loadTracks, playTrack, pauseTrack, resumeTrack, nextTrack, previousTrack } =
    audioSlice.actions;
export default audioSlice.reducer;