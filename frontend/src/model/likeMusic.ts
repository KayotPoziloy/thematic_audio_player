import axios from "axios";
import {API_URL} from "../config";


export const checkIfLiked = async (trackId: string) => {
    try {
        const response = await axios.get(`${API_URL}api/music/like`, {
            params: { id: trackId },
            withCredentials: true,
        });

        const likedMusic = response.data.liked;
        /**
         * @ts-expect-error
         */
        return likedMusic.some((track: { id: string }) => track.id === trackId);
    } catch (err) {
        console.error("Ошибка при проверке лайка", err);
        return false;
    }
};

export const addLike = async (trackId: string, location: Location) => {
    try {
        await axios.put(`${API_URL}api/music/like`, {
            id: trackId,
        }, {
            withCredentials: true,
        });
        if (location.pathname === '/favoritesList') {
            window.location.reload();
        }
    } catch (err) {
        console.error("Ошибка при добавлении лайка", err);
    }
};

export const removeLike = async (trackId: string) => {
    try {
        await axios.delete(`${API_URL}api/music/like`, {
            data: { id: trackId },
            withCredentials: true,
        });
    } catch (err) {
        console.error("Ошибка при удалении лайка", err);
    }
};

export const getLiked = async () => {
    try {
        const response = await axios.get(`${API_URL}api/music/like`, {
            withCredentials: true,
        });
        return response.data.liked;
    } catch (error) {
        console.error('Ошибка при загрузке избранных треков', error);
    }
};