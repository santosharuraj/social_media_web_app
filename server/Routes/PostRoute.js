import expxress from "express";
import { createPost, deletePost, getPost, getTimeLinePost, likePost, updatePost } from "../Controller/PostController.js";

const route = expxress.Router();
route.post("/", createPost);
route.get("/:id", getPost);
route.put("/:id", updatePost);
route.delete("/:id", deletePost);
route.put("/:id/like", likePost);
route.get("/:id/timeline", getTimeLinePost);
export default route;
