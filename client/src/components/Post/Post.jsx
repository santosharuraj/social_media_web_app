import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import { deletepost, deletePost, likePost } from '../../Api/PostRequest'
import { deletePosts } from '../../Actions/postAction'
import { useEffect } from 'react'
import { getUser } from '../../Api/UserRequest'


const Post = ({data}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [liked,setLiked]=useState(data.likes.includes(user._id));
  const [likes,setLikes]=useState(data.likes.length);
  const [userInfo,setUserInfo]=useState();
  const handleLikes=()=>{
    setLiked((prev)=>!prev);
    likePost(data._id,user._id);
    liked? setLikes((prev)=>prev-1):setLikes((prev)=>prev+1);
  }

  
  const dispatch=useDispatch();
  const handleDelete=()=>{
     if(data.userId===user._id){
      // deletePosts(data._id,data.userId);
     }
  }
  useEffect(()=>{
     const findUser=async()=>{
      const user_post=await getUser(data.userId);
      setUserInfo(user_post.data);
     }
     findUser();
  },[]);
  return (
    <div className="Post">
      <div className='profilesec'>
      <img className='profileIcon' src='https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg' alt="" />
      <span className='profilename'>{userInfo!==undefined && userInfo.firstname} {userInfo!==undefined && userInfo.lastname}</span>
      </div>
      <span style={{color: "gray", fontSize: '16px'}}> {data.desc}</span>
        <img src={data.image ?process.env.REACT_APP_PUBLIC_FOLDER+data.image:" "} alt="" />


        <div className="postReact">
            <img src={liked?Heart: NotLike} alt="" onClick={handleLikes} style={{cursor:"pointer"}} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

        <div className="detail">
          {
            data.userId===user._id && <button onClick={handleDelete}>Delete Post</button>
          }
        
            
        </div>
    </div>
  )
}

export default Post