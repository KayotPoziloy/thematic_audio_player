import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {loadAudioState} from "../../utils/localStorage";
import Bugsnag from "@bugsnag/js";
import {API_URL} from "../../config";

interface Track {
    id: number;
    playlist_id: number;
    name: string;
    author: string;
    filename: string;
    tag: string;
    duration: number;
}

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

const getTrackDuration = (filename: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audioElement = new Audio(`${API_URL}api/music/m/${filename}`);
        audioElement.onloadedmetadata = () => {
            resolve(audioElement.duration);
        };
        audioElement.onerror = (error) => {
            reject(error);
        };
    });
};

export const fetchPlaylistTracks = createAsyncThunk(
    "audio/fetchPlaylistTracks",
    async (playlistId: number, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${API_URL}api/music/musics`,
                {id: playlistId},
                {withCredentials: true}
            );

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            const tracksWithDuration = await Promise.all(
                response.data.musics.map(async (track: Track) => {
                    try {
                        const duration = await getTrackDuration(track.filename);
                        return {
                            ...track,
                            duration,
                        };
                    } catch (error) {
                        Bugsnag.notify(error instanceof Error ? error.message : "Unknown error");
                        return { ...track, duration: 0 }; // Default to 0 if duration extraction fails
                    }
                })
            );

            return tracksWithDuration;
        } catch (error: unknown) {
            if (error instanceof Error) {
                Bugsnag.notify(error.message);
                return rejectWithValue(error.message);
            }
            Bugsnag.notify("Unknown error occurred");
            return rejectWithValue("Unknown error occurred");
        }
    }
);

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
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
} = audioSlice.actions;

export default audioSlice.reducer;
