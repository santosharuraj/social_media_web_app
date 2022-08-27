import mongoose from "mongoose";
import UserPostModal from "../Model/postModal.js";
import UserModal from "../Model/userModal.js";
export const createPost = async(req, res) => {
    const newPost = new UserPostModal(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPost = async(req, res) => {
    const id = req.params.id;
    try {
        const post = await UserPostModal.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async(req, res) => {
    const postid = req.params.id;
    const { userId } = req.body;
    try {
        const post = await UserPostModal.findById(postid);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated Successfuly");
        } else {
            res.status(403).json('Access Denied !!');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const deletePost = async(req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await UserPostModal.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json('Post deleted successfuly');
        } else {
            res.status(403).json('Access Denied !!');
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const likePost = async(req, res) => {
    const postid = req.params.id;
    const { userId } = req.body;
    try {
        const post = await UserPostModal.findById(postid);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post Like successfuly");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post dislike successfuly");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getTimeLinePost = async(req, res) => {
    const userId = req.params.id;
    try {
        const currentUserPosts = await UserPostModal.find({ userId: userId });
        const followingPosts = await UserModal.aggregate([{
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }

            },
            {
                $lookup: {
                    from: "userposts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
            .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                }

            ))
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}