export const SET_USER:"SET_USER" = "SET_USER";
export const LOGOUT:"LOGOUT" = "LOGOUT";

const defaultState = {
    currentUser: null,
    isAuth:false
}

export default function userReducer(state = defaultState, action: any){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth:true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: null,
                isAuth: false
            }
        default:
            return state;
    }
}

export const setUser = (login: any) => ({ type: SET_USER, payload: login });
export const logout = () => ({type: LOGOUT})