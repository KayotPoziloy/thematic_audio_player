import axios from "axios";


export const checkIfLiked = async (trackId: string) => {
    try {
        const response = await axios.get("http://localhost:4000/api/music/like", {
            params: { id: trackId },
            withCredentials: true,
        });

        const likedMusic = response.data.liked;
        // @ts-ignore
        return likedMusic.some((track: { id: string }) => track.id === trackId);
    } catch (err) {
        console.error("Ошибка при проверке лайка", err);
        return false;
    }
};

export const addLike = async (trackId: string, location: any) => {
    try {
        await axios.put("http://localhost:4000/api/music/like", {
            id: trackId,
        }, {
            withCredentials: true,
        });
        if (location.pathname === '/favoritesList') {
            window.location.reload();
        }
    } catch (err) {
        // @ts-ignore
        console.error("Ошибка при добавлении лайка", err.response ? err.response.data : err.message);
    }
};

export const removeLike = async (trackId: string) => {
    try {
        await axios.delete("http://localhost:4000/api/music/like", {
            data: { id: trackId },
            withCredentials: true,
        });
    } catch (err) {
        console.error("Ошибка при удалении лайка", err);
    }
};

export const getLiked = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/music/like', {
            withCredentials: true,
        });
        return response.data.liked;
    } catch (error) {
        console.error('Ошибка при загрузке избранных треков', error);
    }
};