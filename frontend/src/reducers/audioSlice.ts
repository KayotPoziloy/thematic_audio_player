import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadAudioState } from "../utils/localStorage";
import { fetchPlaylistTracks } from "../model";

interface Track {
    id: number;
    playlist_id: number;
    name: string;
    author: string;
    filename: string;
    tag: string;
}

interface AudioState {
    tracks: Track[];
    currentTrackIndex: number;
    isPlaying: boolean;
    currentTime: number;
    error: string | null;
}

const savedState = loadAudioState();

const initialState: AudioState = {
    tracks: [],
    currentTrackIndex: savedState?.currentTrackIndex || 1,
    isPlaying: false,
    currentTime: savedState?.currentTime || 0,
    error: null,
};

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
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
            state.currentTime = 0;
        },
        previousTrack: (state) => {
            state.currentTrackIndex =
                (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
            state.isPlaying = true;
            state.currentTime = 0;
        },
        clearTracks: (state) => {
            state.tracks = [];
            state.currentTrackIndex = 0;
            state.isPlaying = false;
            state.currentTime = 0;
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
            .addCase(fetchPlaylistTracks.rejected, (
                state,
                action
            ) => {
                state.error = action.payload as string;
            });
    },
})

export const {
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack ,
    clearTracks,
} = audioSlice.actions;
export default audioSlice.reducer;