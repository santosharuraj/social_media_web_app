import React, { useState,useEffect } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import * as UserApi from '../../Api/UserRequest'
import { logout } from "../../Actions/AuthAction";
const InfoCard = () => {
  const {user}=useSelector((state)=>state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch=useDispatch();
  const param=useParams();
  const profileUserId=param.id;
  const [profileUser,setProfileUser]=useState({});
  useEffect(()=>{
    const fetchUserProfile=async()=>{
      if(profileUserId===user._id){
        setProfileUser(user);
      }else{
        const profileUser=await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    }

    fetchUserProfile();
  },[user])

  const handleLogout=()=>{
    dispatch(logout());
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
         {user._id=== profileUserId &&
           <div>
           <UilPen
             width="2rem"
             height="1.2rem"
             onClick={() => setModalOpened(true)}
           />
           <ProfileModal
             modalOpened={modalOpened}
             setModalOpened={setModalOpened}
             data={user}
           />
         </div>}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{user.relationship? user.relationship :"mention relation"}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{user.livesin ? user.livesin :"Mention your location"}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{user.workat ?user.workat:"Mention the work"}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
