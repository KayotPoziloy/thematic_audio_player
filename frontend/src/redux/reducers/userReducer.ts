export const SET_USER = "SET_USER" as const;
export const LOGOUT = "LOGOUT" as const;

type SetUserAction = {
    type: typeof SET_USER;
    payload: string | null;
};

type LogoutAction = {
    type: typeof LOGOUT;
};

export type UserAction = SetUserAction | LogoutAction;

export type UserState = {
    currentUser: string | null;
    isAuth: boolean;
};

const defaultState: UserState = {
    currentUser: null,
    isAuth: false,
};

export default function userReducer(state = defaultState, action: UserAction){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth:true
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: null,
                isAuth: false
            }
        default:
            return state;
    }
}

export const setUser = (login: string | null): SetUserAction => ({
    type: SET_USER,
    payload: login,
});
export const logout = () => ({type: LOGOUT})