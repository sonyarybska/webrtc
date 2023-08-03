import React, { useState } from "react";
import MeetGridCard from "./MeetGridCard";
import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import "./MeetGrid.css";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MeetGrid = (props) => {
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  const toggleMic = () => {
    try {
      const audio = props.localVideo.current.srcObject.getAudioTracks()[0];
      if (micOn) {
        audio.enabled = false;
        setMicOn(false);
      } else {
        audio.enabled = true;
        setMicOn(true);
      }
    } catch (error) {
      console.error("Error in toggleMic :", error);
    }
  };

  const toggleVideo = () => {
    try {
      const videoTrack = props.localStream
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoActive(videoTrack.enabled);
      }
    } catch (error) {
      console.error("Error in toggleVideo :", error);
    }
  };

  const endCall = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="meet">
      <div className="meet_grid">
        <video ref={props.localVideo} autoPlay />
        {props.peers.map((peer) => {
          return (
            <MeetGridCard
              key={peer?.peerId}
              peer={peer?.peer}
              name={peer?.name}
              state={peer?.state}
            />
          );
        })}
      </div>
      <div className="meet_options">
        <IconButton
          onClick={toggleVideo}
          sx={{ backgroundColor: "white", borderRadius: 40, mr: 2 }}
          size="large"
        >
          {videoActive ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <Button
          onClick={endCall}
          variant="contained"
          sx={{
            textDecoration: "none",
            textTransform: "none",
            color: "white",
            backgroundColor: "red",
            boxShadow: "none",
            border: "none",
            "&:hover": {
              backgroundColor: "darkred",
            },
            fontFamily: "Poppins, sans-serif", // Add Poppins font style
            fontSize: "1rem", // Make the text size large (adjust the value as needed)
            borderRadius: "20px", // Rounded corners (adjust the value as needed)
            padding: "10px 20px", // Increase padding to make the button larger
          }}
        >
          End Meeting
        </Button>
        <IconButton
          onClick={toggleMic}
          sx={{ backgroundColor: "white", borderRadius: 40, ml: 2 }}
          size="large"
        >
          {micOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default MeetGrid;
