import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTracks, fetchPlaylistTracks } from "./audioSlice";
import axios from "axios";
import { AppDispatch } from "./index";
import { loadAudioState } from "../../utils/localStorage";
import Bugsnag from "@bugsnag/js";

interface Playlist {
    id: number;
    name: string;
    background: string;
    pic: string;
}

interface PlaylistState {
    playlists: Playlist[];
    selectedPlaylistId: number;
    error: string | null;
}

const savedState = loadAudioState();

const initialState: PlaylistState = {
    playlists: [],
    selectedPlaylistId: savedState?.currentPlaylistIndex || 1,
    error: null,
}

interface ApiPlaylist {
    id: number;
    name: string;
    tag: string;
}

export const fetchPlaylists = createAsyncThunk(
    "playlist/fetchPlaylists",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/music/playlists",
                { withCredentials: true }
            );
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            const playlists = response.data.playlists.map((playlist: ApiPlaylist) => {
                const tag = JSON.parse(playlist.tag);
                return {
                    id: playlist.id,
                    name: playlist.name,
                    background: tag.background,
                    pic: tag.pic,
                };
            });
            return playlists;
        } catch (error: unknown) {
            if (error instanceof Error) {
                Bugsnag.notify(error.message)
                return rejectWithValue(error.message);
            }
            Bugsnag.notify("Unknown error occurred")
            return rejectWithValue("Unknown error occurred");
        }
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setSelectedPlaylist: (state, action: PayloadAction<number>) => {
            state.selectedPlaylistId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
                state.playlists = action.payload;
                state.error = null;
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedPlaylist } = playlistSlice.actions;

export const changePlaylist = (playlistId: number) => (dispatch: AppDispatch) => {
    dispatch(setSelectedPlaylist(playlistId)); // Сохраняем id выбранного плейлиста
    dispatch(clearTracks()); // Очищаем треки
    dispatch(fetchPlaylistTracks(playlistId)); // Загружаем новые треки
};

export default playlistSlice.reducer;
