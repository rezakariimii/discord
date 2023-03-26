import React from "react";
import { useDispatch } from "react-redux";
import {
  setChannelInfo,
} from "../../features/user/appSlice";
import classes from "./SidebarChannel.module.css";

const SidebarChannel = ({ id, channelName }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={classes.sidebarChannel}
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName,
          })
        )
      }
    >
      <h4>
        <span className={classes[`sidebarChannel__hash`]}>#</span>
        {channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
