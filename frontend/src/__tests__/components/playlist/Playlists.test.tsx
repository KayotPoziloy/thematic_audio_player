// Playlists.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Playlists} from "../../../components/Playlist/Playlists";

const mockAudioSlice = createSlice({
    name: "audio",
    initialState: {
        currentTime: 0,
        rotationAngle: 0,
        duration: 300,
        isPlaying: true,
    },
    reducers: {
        setRotationAngle: (state, action: PayloadAction<number>) => {
            state.rotationAngle = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
    },
});

const { setRotationAngle, setCurrentTime } = mockAudioSlice.actions;

describe("Playlists Component", () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                audio: mockAudioSlice.reducer,
            },
        });
    });

    it("renders playlist and displays a default message when no playlist is selected", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Playlists />
            </Provider>
        );

        expect(getByText("Выберите плейлист")).toBeInTheDocument();
    });

    it("updates rotation angle on mouse drag", () => {
        const { container } = render(
            <Provider store={store}>
                <Playlists />
            </Provider>
        );

        const playlistPic = container.querySelector(".playlist-pic");
        expect(playlistPic).toBeInTheDocument();

        fireEvent.mouseDown(playlistPic!);
        fireEvent.mouseMove(playlistPic!, { clientX: 200, clientY: 200 });
        fireEvent.mouseUp(playlistPic!);

        const { rotationAngle } = store.getState().audio; // Доступ через state.audio
        expect(rotationAngle).toBeGreaterThan(0);
    });

    it("saves currentTime and updates when it changes", () => {
        render(
            <Provider store={store}>
                <Playlists />
            </Provider>
        );

        store.dispatch(setCurrentTime(120));

        const { currentTime } = store.getState().audio;
        expect(currentTime).toBe(120);
    });

    it("dispatches setRotationAngle action", () => {
        const { container } = render(
            <Provider store={store}>
                <Playlists />
            </Provider>
        );

        const playlistPic = container.querySelector(".playlist-pic");
        fireEvent.mouseDown(playlistPic!);
        fireEvent.mouseMove(playlistPic!, { clientX: 150, clientY: 150 });
        fireEvent.mouseUp(playlistPic!);

        const { rotationAngle } = store.getState().audio; // Доступ через state.audio
        expect(rotationAngle).not.toBe(0);
    });
});
