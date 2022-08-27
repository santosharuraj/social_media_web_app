import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUsers, unfollowUsers } from '../../Actions/userUpdates';
import { Link } from 'react-router-dom'
import { createChat } from '../../Api/UserRequest';
import { useEffect } from 'react';
const User = ({ person }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));
    const dispatch = useDispatch();
    const handleFollow = async () => {
        if (following) {
            dispatch(unfollowUsers(person._id, user));
        } else {
            dispatch(followUsers(person._id, user));

        }
        setFollowing(!following);
    }
    // useEffect(async () => {
    //     if (!following) {
    //         const resp = await createChat(person._id, user);
    //         console.log('createChat', resp);
    //     }
    // })
    return (
        <>

            <div className="follower">
                <div>
                    <img src={person.profilePicture ? serverPublic + person.profilePicture : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"} alt="" className='followerImage' />
                    <div className="name">
                        <span>{person.firstname}</span>
                        <span>@{person.username}</span>
                    </div>
                </div>
                <button className='button fc-button' onClick={handleFollow}>
                    {following ? "Unfollow" : "Follow"}
                </button>
            </div>
        </>
    )
}

export default User
