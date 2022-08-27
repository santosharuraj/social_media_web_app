import * as UserApi from '../Api/UserRequest'
export const userUpdates = (id, formdata) => async(dispatch) => {
    dispatch({ type: "UPDATING_START" });
    try {
        const { data } = await UserApi.userUpdate(id, formdata);
        dispatch({ type: "UPDATING_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_FAILED" });
    }
}

export const followUsers = (id, data) => async(dispatch) => {
    dispatch({ type: "FOLLOW_USER" });
    await UserApi.followUser(id, data);
}


export const unfollowUsers = (id, data) => async(dispatch) => {
    dispatch({ type: "UNFOLLOW_USER" });
    await UserApi.unfollowUser(id, data);
}