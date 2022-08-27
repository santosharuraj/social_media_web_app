import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../../Api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import {Link} from 'react-router-dom'
import {io} from 'socket.io-client';
import './Chat.css';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useRef } from 'react';
const Chat = () => {
    const {user}=useSelector((state)=>state.authReducer.authData);
    const [chats,setChats]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const [sendMessage,setSendMessage]=useState(null);
    const [receivedMessage,setReceivedMessage]=useState(null);

    const socket=useRef();
    useEffect(()=>{
      socket.current=io('http://localhost:8800');
      socket.current.emit('new_user_add',user._id);
      socket.current.on('get_user',(users)=>{
        setOnlineUsers(users);
      })
    },[user]);

    //send message to socket
    useEffect(()=>{
      if(sendMessage!==null){
        socket.current.emit('send_messag',sendMessage);
      }
    },[sendMessage]);

    //received message from socket
    useEffect(()=>{
      socket.current.on('receive-message',(data)=>{
        setReceivedMessage(data);
        console.log(data);
      });
    },[]);
    useEffect(()=>{
        const getChats=async()=>{
            try {
                const {data}=await userChats(user._id);
                setChats(data);
            } catch (error) {
                
            }
        }
        getChats();
    },[user])

    const checkOnlineStatus=(chat)=>{
      const chatMember=chat.members.find((member)=> member!==user._id);
      const online=onlineUsers.find((user)=>user.userId==chatMember);
      return online?true:false;
    }
    console.log("Chats",chats);
  return (
    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
      <LogoSearch />
      <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">
          {chats.map((chat) => (
            <div
              onClick={() => {
                setCurrentChat(chat);
              }}
            >
              <Conversation
                data={chat}
                currentUserId={user._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Side */}

    <div className="Right-side-chat">
      <div style={{ width: "20rem", alignSelf: "flex-end" }}>
      <div className="navIcons">
       <Link to='/home'>
       <img src={Home} alt="" />
       </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to='../chat'>
        <img src={Comment} alt="" />
        </Link>
      </div>
      </div>
      <ChatBox
        chat={currentChat}
        currentUserId={user._id}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
      />
    </div>
  </div>
  )
}

export default Chat
