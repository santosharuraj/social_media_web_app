import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getUser } from '../../Api/UserRequest';

const UsersDetails = () => {
    const param = useParams();
    const [userDetails, setUserDetails] = useState();
    console.log(param.id);
    useEffect(() => {
        const findUser = async () => {
            const user_details = await getUser(param.id);
            setUserDetails(user_details.data);
            console.log(user_details.data);
        }
        findUser();
    }, [param.id])
    return (
        <div className='userdetails'>
            <span>{userDetails !== undefined && userDetails.firstname} {userDetails !== undefined && userDetails.lastname}</span>
            {/* <span>{userDetails !== undefined && }</span> */}

        </div>
    )
}

export default UsersDetails
