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

interface ApiPlaylist {
    id: number;
    name: string;
    tag: string; // tag хранится как строка
}

export const fetchPlaylists = createAsyncThunk(
    "playlist/fetchPlaylists",
    async (_, { rejectWithValue }) => {
        try {
            // console.log(localStorage)
            // debugger
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
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Unknown error occurred");
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
