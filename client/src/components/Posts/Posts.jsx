import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import './Posts.css'
import Post from '../Post/Post'
import { useEffect } from 'react';
import { getTimelinePosts } from '../../Actions/postAction';
import ReactLoading from "react-loading";
const Posts = () => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);
  let {posts,loading}=useSelector((state)=>state.postReducer);
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id));
  },[]);
 
  return (
    <div className="Posts">
        {loading ?<ReactLoading type="bubbles" color="#f5c32c" />: posts.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts