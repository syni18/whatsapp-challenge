import React, {useState, useEffect, createRef} from 'react'
import './chat.css'
import firebase from 'firebase/compat/app'
import db from '../firebaseconfig'
import { useStateValue } from '../StateProvider'
import { useParams } from 'react-router-dom';
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import Emoji from './EmojiComponent'

function Chat() {
    const inputRef = createRef();
    const [input , setInput ] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName , setRoomName] = useState("");
    const [messages , setMessages] = useState([]);
    const [showemojis , setShowEmojis] = useState();
    const [cursorPointers , setCursorPointers] = useState();
    const [{user} ,  ] = useStateValue();

    useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId)
        .onSnapshot(snapshot => (
          setRoomName(snapshot.data().name)
        ));

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) =>
          doc.data()
          )));
      }
    },[roomId]);

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 10000));
    }, [roomId]);

    const sendMessage = (e) => {
      e.preventDefault();
      console.log('you typed>>>' , input);

      if (input.trim().length !== 0) {
        db.collection("rooms").doc(roomId).collection("messages").add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }

      setInput("");
    }

    const pickEmoji = (e,{emoji}) => {
      e.preventDefault();
      const ref = inputRef.current.value;
      ref.focus();
      const start = input.substring( ref.selectionStart);
      const end = input.substring(ref.selectionStart);
      const text = start + emoji + end;
      setInput(text);
      setCursorPointers(start.length + emoji.length);
    }
    const remoerr = () => {
      inputRef.current.selectionEnd = cursorPointers;
    }
    useEffect(() => {
      remoerr();
    })

    const handleShowEmojis = () => {
      inputRef.current.focus();
      setShowEmojis(!showemojis);
    }
  return (
    <div className="chat" showemojis={showemojis}>
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />

        <div className="chat_header_info">
          <h2>{roomName}</h2>
          <p className="chat_lastseen">
            {""}
            {messages.length
              ? new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
              : "long ago"}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {message.timestamp
                ? new Date(message.timestamp?.toDate()).toUTCString()
                : "sending..."}
            </span>
          </p>
        ))}
        {/* {
          <div className={`emoji-list ${!showemojis && "hidden"}`}>
            <Emoji pickEmoji={pickEmoji} />
          </div>
        } */}
        {showemojis ? (
          <div className="emoji_list">
            <Emoji pickEmoji={pickEmoji} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="chat_footer">
        <IconButton onClick={handleShowEmojis}>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton className="attach_rotate">
          <AttachFile />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            className="chat_type"
            placeholder="  Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            <SendIcon />
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat