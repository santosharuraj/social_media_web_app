import * as PostApi from '../Api/PostRequest.js'
export const getTimelinePosts = (id) => async(dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
        const { data } = await PostApi.getTimelinePost(id);
        dispatch({ type: "RETRIEVING_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "RETRIEVING_FAILED" });
    }
}