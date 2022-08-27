export const authReducer = (
    state = { authData: null, loading: false, error: false, updatingloading: false },
    action
) => {
    switch (action.type) {
        case "AUTH_START":
            return {...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action ?.data }));
            return {...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAILED":
            return {...state, loading: false, error: true };

        case "UPDATING_START":
            return {...state, updatingloading: true, error: false };
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action ?.data }));
            return {...state, authData: action.data, updatingloading: false, error: false };
        case "UPDATING_FAILED":
            return {...state, updatingloading: false, error: true };
        case "FOLLOW_USER":
            localStorage.setItem("profile", JSON.stringify({...action ?.data }));
            return {...state,authData:{...state.authData,user:{...state.authData.user,following:[...state.authData.user.following,action.data]}} };
        case "UNFOLLOW_USER":
             return {...state,authData:{...state.authData,user:{...state.authData.user,following:[...state.authData.user.following.filter((personId)=>
                personId!==action.data)]}}, updatingloading: false, error: true };

        case "LOGOUT":
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false }
        default:
            return state;
    }
};