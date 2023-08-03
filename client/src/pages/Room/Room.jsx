import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import "./Room.css";
import logo from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import MeetGrid from "../../components/MeetGrid/MeetGrid";
import PersonIcon from "@mui/icons-material/Person";
import DoneIcon from "@mui/icons-material/Done";
import ShareIcon from "@mui/icons-material/Share";
import { Button, IconButton } from "@mui/material";
import Chat from "../../components/Chat/Chat";
import socketFunctions from "../../utils/sockets.js";

const Room = () => {
  const { roomID } = useParams();
  const localVideo = useRef();
  const user = localStorage.getItem("user");
  const [peers, setPeers] = useState([]);
  const peer = new Peer();
  const addedPeers = useRef([]);
  const [localStream, setLocalStream] = useState(null);
  const socket = useRef();
  const [msgs, setMsgs] = useState([]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("http://localhost:5173/room/" + roomID);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset the copied state after 2 seconds
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
    socket.current = io("https://study-hive-backend-100.onrender.com");
    socketFunctions.newMessage(socket, setMsgs, user);

    peer.on("open", (userID) => {
      socket.current.emit("join-room", roomID, userID, user);
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localVideo.current.srcObject = stream;
        setLocalStream(stream);
        peer.on("call", (call) => {
          const peerID = call.peer;
          socket.current.emit("find-user", { roomID, peerID });
          call.answer(stream);
          socketFunctions.connectToNewUser(
            socket,
            peerID,
            addedPeers,
            call,
            setPeers
          );
        });

        socketFunctions.getAllUsers(socket, addedPeers, stream, peer, setPeers);
        socketFunctions.disconnectUser(socket, setPeers);
      });
  }, [roomID, user]);

  return (
    <div className="room">
      <div className="sidebar">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <IconButton href="/">
            <HomeIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <IconButton onClick={copyToClipboard}>
            {copied ? (
              <DoneIcon sx={{ fontSize: 30 }} />
            ) : (
              <ShareIcon sx={{ fontSize: 30 }} />
            )}
          </IconButton>
          <Button
            size="small"
            variant="outline"
            sx={{
              border: "solid 1px grey",
              borderRadius: 30,
              mt: 2,
              fontColor: "grey",
            }}
            startIcon={<PersonIcon sx={{ fontSize: 30, color: "grey" }} />}
          >
            {peers.length + 1}
          </Button>
        </div>
      </div>
      <div className="meet">
        <MeetGrid
          peers={peers}
          localVideo={localVideo}
          localStream={localStream}
        />
      </div>
      <div className="chat">
        <h2>Chat</h2>
        <Chat roomID={roomID} socket={socket} msgs={msgs} />
      </div>
    </div>
  );
};

export default Room;
