import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTracks } from "./audioSlice";
import { fetchPlaylistTracks, fetchPlaylists } from "../model";
import { AppDispatch } from "./index";
import { loadAudioState } from "../utils/localStorage";

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
    dispatch(setSelectedPlaylist(playlistId));
    dispatch(clearTracks());
    dispatch(fetchPlaylistTracks(playlistId));
};

export default playlistSlice.reducer;
