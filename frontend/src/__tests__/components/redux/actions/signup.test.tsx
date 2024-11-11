import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import {API_URL} from "../../../../config";
import {signup} from "../../../../redux/actions/user";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('signup action', () => {
    const navigate = jest.fn() as jest.MockedFunction<NavigateFunction>;

    it('вызов axios.post  и переход при успехе', async () => {
        mockedAxios.post.mockResolvedValue({}); // имитируем успешный ответ
        const login = 'testuser';
        const password = 'password';
        const name = 'Test Name';

        const action = signup(login, password, name, navigate);
        await action();

        expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}api/user/signup`, {
            login,
            password,
            name,
        });
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    it('возврат общего типа ошибки если нет сообщения', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Network Error'));

        const action = signup('testuser', 'password', 'Test Name', navigate);
        const errorMessage = await action();

        expect(errorMessage).toBe('Произошла ошибка');
    });
});
