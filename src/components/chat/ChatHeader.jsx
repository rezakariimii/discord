import React from "react";
import classes from "./ChatHeader.module.css";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const ChatHeader = ({ channelName }) => {
  return (
    <div className={classes.chatHeader}>
      <div className={classes[`chatHeader__left`]}>
        <h3>
          <span className={classes[`chatHeader__hash`]}>#</span>
          {channelName}
        </h3>
      </div>
      <div className={classes[`chatHeader__right`]}>
        <NotificationsIcon />
        <EditLocationIcon />
        <PeopleAltRoundedIcon />

        <div className={classes[`chatHeader__search`]}>
          <input placeholder="Search" type="text" />
          <SearchRoundedIcon />
        </div>
        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
};

export default ChatHeader;
