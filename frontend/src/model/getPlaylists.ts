import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

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
                API_URL + "api/music/playlists",
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