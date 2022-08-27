import * as UploadApi from '../Api/UploadRequest'

export const uploadImage = (data) => async(dispatch) => {
    try {
        await UploadApi.uploadImg(data);
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data) => async(dispatch) => {
    dispatch({ type: "UPLOAD_START" })
    try {
        const newPost = await UploadApi.uploadPosts(data);
        dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data })
    } catch (error) {
        dispatch({ type: "UPLOAD_FAILED" })
    }
}