import React from 'react'
import './FollowersCard.css'
import {useSelector} from 'react-redux'
import { Followers } from '../../Data/FollowersData'
import User from '../User/User'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllUser } from '../../Api/UserRequest'


const FollowersCard = () => {
    const [person,setPerson]=useState([]);
    const {user}=useSelector((state)=>state.authReducer.authData);
    useEffect(()=>{
        const fetchPersons=async()=>{
        const {data}=await getAllUser();
        setPerson(data);
        }
        fetchPersons();
    },[])
  return (
    <div className="FollowersCard">
        <h3>People may you know</h3>

        {person. map((person, id)=>{
            if(person._id!== user._id){
                return(
                    <User person={person} key={id}/>
                )
            }
        })}
    </div>
  )
}

export default FollowersCard