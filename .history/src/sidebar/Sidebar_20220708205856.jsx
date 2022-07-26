import React, {useState , useEffect } from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import SidebarChat from '../sidebarChat/SidebarChat'
import Avatar from "@mui/material/Avatar";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import db from '../firebaseconfig'
import { auth } from '../firebaseconfig'
import { signOut } from 'firebase/auth'
import {useStateValue } from '../StateProvider'
function Sidebar() {
  const navigate = useS
  const [rooms , setRooms ] = useState([]);
  const [searchRoom , setSearchRoom ] = useState("");
  const [{user},] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    signOut(auth);
    navigate('/login');
  }

  useEffect( () => {
    db.collection('rooms').onSnapshot((snapshot) => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))
    ))
  },[]);


  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar>{user.displayName.charAt(0)}</Avatar>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <SidebarChat addNewChat />
          </IconButton>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px  2px 8px rgba(0,0,0,0.32))",
                mt: 1.0,
                p: 0.5,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={signout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="  Search or start new chat"
            onChange={(e) => {
              setSearchRoom(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebar_chats">
        {rooms
          .filter((room) => {
            if (searchRoom === "") {
              return room;
            } else if (
              room.data.name.toLowerCase().includes(searchRoom.toLowerCase())
            ) {
              return room;
            }
            return 0;
          })
          .map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar