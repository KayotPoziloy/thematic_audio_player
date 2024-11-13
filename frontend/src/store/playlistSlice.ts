import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Playlist {
    id: number;
    name: string;
    background: string;
    pic: string;
}

interface PlaylistState {
    playlists: Playlist[];
    error: string | null;
}

const initialState: PlaylistState = {
    playlists: [],
    error: null,
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

            const playlists = response.data.playlists.map((playlist: any) => {
                const tag = JSON.parse(playlist.tag);
                return {
                    id: playlist.id,
                    name: playlist.name,
                    background: tag.background,
                    pic: tag.pic,
                };
            });

            return playlists;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
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


export default playlistSlice.reducer;
