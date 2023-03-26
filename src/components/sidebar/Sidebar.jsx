import React, { useState, useEffect } from "react";
import classes from "./Sidebar.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import TagIcon from "@mui/icons-material/Tag";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallIcon from "@mui/icons-material/Call";
import { Avatar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import db, { auth } from "../authentication/firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const channelRef = query(collection(db, "channels"));
    onSnapshot(channelRef, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const addChannelHandler = () => {
    const channelName = prompt("Enter a new Channel Name");

    if (channelName) {
      addDoc(collection(db, "channels"), { channelName });
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes[`sidebar__top`]}>
        <h3>Clever Programmer</h3>
        <ExpandMoreIcon />
      </div>
      <div className={classes[`sidebar__channels`]}>
        <div className={classes[`sidebar__channelsHeader`]}>
          <div className={classes[`sidebar__header`]}>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon
            onClick={addChannelHandler}
            className={classes[`sidebar__addChannel`]}
          />
        </div>
        <div className={classes[`sidebar__channelsList`]}>
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
          ))}
        </div>
      </div>
      <div className={classes[`sidebar__voice`]}>
        <SignalCellularAltIcon
          className={classes[`sidebar__voiceIcon`]}
          fontSize="large"
        />
        <div className={classes[`sidebar__voiceInfo`]}>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className={classes[`sidebar__voiceIcons`]}>
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className={classes[`sidebar__profile`]}>
        <Avatar src={user.photo} />
        <div className={classes[`sidebar__profileInfo`]}>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className={classes[`sidebar__profileIcons`]}>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
          <ExitToAppIcon onClick={() => auth.signOut()} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
