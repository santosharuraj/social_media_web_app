export const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        // belongs to PostShare.jsx
        case "UPLOAD_START":
            return {...state, error: false, uploading: true };
        case "UPLOAD_SUCCESS":
            return {...state, posts: [action.data, ...state.posts], uploading: false, error: false };
        case "UPLOAD_FAILED":
            return {...state, uploading: false, error: true };
            // belongs to Posts.jsx
        case "RETREIVING_START":
            return {...state, loading: true, error: false };
        case "RETRIEVING_SUCCESS":
            return {...state, posts: action.data, loading: false, error: false };
        case "RETRIEVING_FAILED":
            return {...state, loading: false, error: true };

        default:
            return state;
    }
};