import React, {useState , useEffect} from 'react'
import './sidebarChat.css'
import  Avatar from '@mui/material/Avatar'
import db from '../firebaseconfig'
import {Link} from 'react-router-dom'
import ChatIcon from "@mui/icons-material/Chat";
function SidebarChat({addNewChat,name, id}) {

    const [seed , setSeed ] = useState("");
    const [messages , setMessages] = useState("");

    useEffect(() => {
      if(id) {
        db.collection('rooms')
          .doc(id)
          .collection('messages')
          .orderBy('timestamp' , 'desc')
          .onSnapshot(snapshot => 
            setMessages(snapshot.docs.map((doc) => doc.data())
            ))
      }
    },[id]);
    useEffect(() =>{
        setSeed(Math.floor(Math.random()*1000));
    }, [])

    const createChat = () => {
        const roomName = window.prompt("Please enter a room name");

        if(roomName) {
            db.collection('rooms').add({
              name: roomName,
            })
        }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
        <div className="sidebarchat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <ChatIcon onClick={createChat} />
  );
}

export default SidebarChat