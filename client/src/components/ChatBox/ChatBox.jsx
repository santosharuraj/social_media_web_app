import React, { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../../Api/MessageRequest';
import { getUser } from '../../Api/UserRequest';
import './ChatBox.css'
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react';
const ChatBox = ({chat,currentUserId,setSendMessage,receivedMessage}) => {
    const [userData,setUserData]=useState(null);
    const [messages,setMessages]=useState([]);
    const [newmessages,setNewMessages]=useState('');
    const scroll=useRef();
    const imageRef = useRef();
    useEffect(()=>{
        const userId=chat!==null && chat.members.find((id)=> id!==currentUserId);
        const getUserData=async()=>{
          try {
            const {data}=await getUser(userId);
          setUserData(data);
          console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
        if(chat!==null){
            getUserData();
              } 
        
    },[chat,currentUserId])

    useEffect(()=>{
        const fetchMessages=async()=>{
            try {
                const {data}=await getMessages(chat._id);
                setMessages(data);
                console.log("msg",data);
            } catch (error) {
                console.log(error);
            }
        }
        if(chat!==null) fetchMessages();
    },[chat]);

    const handleChange=(newmessages)=>{
            setNewMessages(newmessages);
    }

    const handleSend=async(e)=>{
       e.preventDefault();
       const message={
        senderId:currentUserId,
        text:newmessages,
        chatId:chat._id
       }

       const  receiverId=chat!==null && chat.members.find((id)=>id!==currentUserId);
       setSendMessage({...message,receiverId});

       try {
        const {data}=await addMessage(message);
        setMessages([...messages,data]);
        setNewMessages('');
       } catch (error) {
        console.log(error);
       }

      
    }

    useEffect(()=>{
      if(receivedMessage!==null && receivedMessage.chatId===chat._id){
          setMessages([...messages,receivedMessage]);
          console.log("Message Arrived: ", receivedMessage)
      }
    },[receivedMessage])
    console.log(messages);

    //always scroll to the last message
    useEffect(()=>{
      scroll.current?.scrollIntoView({behavior:"smooth"});
    },[messages])
  return (
    <>
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* chat-body */}
          <div className="chat-body" >
            {messages.map((message) => (
              <>
                <div ref={scroll}
                  className={
                    message.senderId === currentUserId
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()} >+</div>
            <InputEmoji
              value={newmessages}
              onChange={handleChange}
            />
            <div className="send-button button" onClick={handleSend}>Send</div>
            <input
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
              ref={imageRef}
            />
          </div>{" "}
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  </>
  )
}

export default ChatBox
