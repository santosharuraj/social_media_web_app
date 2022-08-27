import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
const ProfileCard = ({location}) => {
  const {user}=useSelector((state)=>state.authReducer.authData);
  const posts=useSelector((state)=>state.postReducer.posts);

  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
      <img src="https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBhcnR8ZW58MHx8MHx8&w=1000&q=80" alt="" />
        <img src={user.profilePicture && user.profilePicture!==undefined ?serverPublic+ user.profilePicture : "https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname.toUpperCase()} {user.lastname.toUpperCase()}</span>
        <span>{user.workat ? user.workat:"Write Bio"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location==='profilepage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=> (post.userId===user._id)).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location==='profilepage' ? "" :<span> <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link></span>}
    </div>
  );
};

export default ProfileCard;
