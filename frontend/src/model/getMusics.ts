import Bugsnag from "@bugsnag/js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

interface Track {
    id: number;
    playlist_id: number;
    name: string;
    author: string;
    filename: string;
    tag: string;
}

export {};

export const fetchPlaylistTracks = createAsyncThunk(
    "audio/fetchPlaylistTracks",
    async (playlistId: number, { rejectWithValue })=> {
        try {
            const response = await axios.post(
                API_URL + "api/music/musics",
                { "id": playlistId },
                { withCredentials: true }
            );
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            const tracks = response.data.musics.map((track: Track) => ({
                id: track.id,
                playlist_id: track.playlist_id,
                name: track.name,
                author: track.author,
                filename: track.filename,
                tag: track.tag,
            }));

            return tracks;
        } catch (error: unknown) {
            if (error instanceof Error) {
                Bugsnag.notify(error.message)
                return rejectWithValue(error.message);
            }
            Bugsnag.notify("Unknown error occurred")
            return rejectWithValue("Unknown error occurred");
        }
    }
)