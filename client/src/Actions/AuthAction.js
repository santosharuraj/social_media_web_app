import * as AuthApi from '../Api/AuthRequest.js';

export const login = (formdata) => async(dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.logIN(formdata);
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAILED" })
    }
};

export const signup = (formdata) => async(dispatch) => {
    try {
        const { data } = await AuthApi.signUP(formdata);
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAILED" })
    }
};

export const logout = () => async(dispatch) => {
    dispatch({ type: "LOGOUT" });
}