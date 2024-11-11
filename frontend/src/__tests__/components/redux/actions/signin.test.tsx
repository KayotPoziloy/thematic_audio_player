import axios from 'axios';

import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import {setUser} from "../../../../redux/reducers/userReducer";
import {signin} from "../../../../redux/actions/user";
import {API_URL} from "../../../../config";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../../../redux/reducers/userReducer', () => ({
    setUser: jest.fn(),
}));
const mockedSetUser = setUser as unknown as jest.Mock;

describe('signin action', () => {
    const navigate = jest.fn() as jest.MockedFunction<NavigateFunction>;
    const dispatch = jest.fn() as Dispatch;

    it('вызов axios.post и переход при успехе', async () => {
        const token = 'testToken';
        mockedAxios.post.mockResolvedValue({
            data: { login: 'testuser', token },
        });

        const login = 'testuser';
        const password = 'password';

        const action = signin(login, password, navigate);
        await action(dispatch);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}api/user/signin`, {
            login,
            password,
        });
        expect(document.cookie).toContain(`token=${token}`);
        expect(dispatch).toHaveBeenCalledWith(mockedSetUser('testuser'));
        expect(navigate).toHaveBeenCalledWith('/account');
    });

    it('возврат общего типа ошибки если нет сообщения', async () => {
        mockedAxios.post.mockRejectedValue(new Error('Network Error'));

        const action = signin('testuser', 'password', navigate);
        const errorMessage = await action(dispatch);

        expect(errorMessage).toBe('Произошла ошибка');
    });
});
