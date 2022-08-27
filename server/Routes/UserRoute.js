import express from 'express'
import AuthMiddleWare from '../MiddleWare/AuthMiddleWare.js';
import { deleteUser, followUser, getAllUser, getCount, getUser, unfollowUser, updateUser } from '../Controller/UserController.js';
const route = express.Router();

route.get('/', getAllUser)
route.get("/:id", getUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);
route.put("/:id/follow", followUser);
route.put("/:id/unfollow", unfollowUser);
route.put("/:id/view", getCount)


export default route;