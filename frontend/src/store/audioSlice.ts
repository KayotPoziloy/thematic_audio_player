import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

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

const initialState: AudioState = {
    tracks: [],
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
    error: null,
};

export const fetchPlaylistTracks = createAsyncThunk(
    "audio/fetchPlaylistTracks",
    async (playlistId: number, { rejectWithValue })=> {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/music/musics",
                { "id": playlistId },
                { withCredentials: true }
            );
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            const tracks = response.data.musics.map((track: any) => ({
                id: track.id,
                playlist_id: track.playlist_id,
                name: track.name,
                author: track.author,
                filename: track.filename,
                tag: track.tag,
            }));

            return tracks;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

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
            state.isPlaying = true;
            state.currentTime = 0;
        },
        previousTrack: (state) => {
            state.currentTrackIndex =
                (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
            state.isPlaying = true;
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

export const { playTrack, pauseTrack, resumeTrack, nextTrack, previousTrack } =
    audioSlice.actions;
export default audioSlice.reducer;