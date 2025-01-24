import { loadAudioState } from "../utils/localStorage";
import { Track } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlaylistTracks } from "../model";

interface AudioState {
    tracks: Track[];
    currentTrackIndex: number;
    isPlaying: boolean;
    currentTime: number;
    rotationAngle: number;
    error: string | null;
    duration: number;
}

const savedState = loadAudioState();

const initialState: AudioState = {
    tracks: [],
    currentTrackIndex: savedState?.currentTrackIndex || 0,
    isPlaying: false,
    currentTime: savedState?.currentTime || 0,
    rotationAngle: 0,
    error: null,
    duration:savedState?.duration || 0,
};

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setDuration:(state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
            state.duration = state.tracks[action.payload]?.duration || 0;
        },
        playTrack: (state, action: PayloadAction<number>) => {
            state.currentTrackIndex = action.payload;
            state.isPlaying = true;
            state.currentTime = 0;
            state.rotationAngle = 0;
            state.duration = state.tracks[action.payload]?.duration || 0;
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
            state.currentTime = 0;
            state.rotationAngle = 0;
            state.duration = state.tracks[state.currentTrackIndex]?.duration || 0;
        },
        previousTrack: (state) => {
            state.currentTrackIndex =
                (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
            state.currentTime = 0;
            state.rotationAngle = 0;
            state.duration = state.tracks[state.currentTrackIndex]?.duration || 0;
        },
        setRotationAngle: (state, action: PayloadAction<number>) => {
            state.rotationAngle = action.payload;
        },
        clearTracks: (state) => {
            state.tracks = [];
            state.currentTrackIndex = 0;
            state.isPlaying = false;
            state.currentTime = 0;
            state.rotationAngle = 0;
            state.duration = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylistTracks.fulfilled, (
                state,
                action: PayloadAction<Track[]>
            ) => {
                state.tracks = action.payload;
                state.error = null;
            })
            .addCase(fetchPlaylistTracks.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setRotationAngle,
    clearTracks,
    setCurrentTime,
    setDuration,
} = audioSlice.actions;

export default audioSlice.reducer;
