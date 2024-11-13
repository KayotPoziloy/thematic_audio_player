import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audioSlice"
import playlistReducer from "./playlistSlice"

const store = configureStore({
    reducer: {
        playlist: playlistReducer,
        audio: audioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;