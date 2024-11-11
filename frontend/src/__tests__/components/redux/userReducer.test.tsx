import userReducer, { setUser, logout, UserState } from "../../../redux/reducers/userReducer";
import {Action} from "redux";

describe('userReducer', () => {
    const initialState: UserState = {
        currentUser: null,
        isAuth: false,
    };

    it('возврашение в предыдущее состояние без других действий', () => {
        expect(userReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    describe('setUser', () => {
        it('установка для текущего user и isAuth значение true, когда setUser вызывается с именем пользователя', () => {
            const username = 'testUser';
            const nextState = userReducer(initialState, setUser(username));

            expect(nextState.currentUser).toBe(username);
            expect(nextState.isAuth).toBe(true);
        });

        it('обработка setUser с нулевым значением и устанавка для isAuth значение true', () => {
            const nextState = userReducer(initialState, setUser(null));

            expect(nextState.currentUser).toBe(null);
            expect(nextState.isAuth).toBe(true);
        });


        it('должен возвращать текущее состояние при выполнении неизвестного действия', () => {
            const unknownAction:Action<string> = { type: 'UNKNOWN_ACTION' };
            const nextState = userReducer(initialState, unknownAction);

            expect(nextState).toEqual(initialState);
        });
    });

    describe('logout', () => {
        it('сбросить текущего user и isAuth=false при выходе из системы', () => {
            const loggedInState: UserState = {
                currentUser: 'testUser',
                isAuth: true,
            };

            const nextState = userReducer(loggedInState, logout());

            expect(nextState.currentUser).toBeNull();
            expect(nextState.isAuth).toBe(false);
        });
    });
});
