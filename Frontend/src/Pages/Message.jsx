import { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FriendContext } from "../context/FriendContext.jsx";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import axios from "axios";

// Connect to the server
const socket = io("http://localhost:3001");

const MessagePage = () => {
  const [messages, setMessages] = useState([]); // Messages array
  const [messageInput, setMessageInput] = useState(""); // Message input field
  const { getFriend, friendData } = useContext(FriendContext);
  const [userData, setUserData] = useState(null);
  const { userId, friendID } = useParams();
  const messagesEndRef = useRef(null); // Scroll reference

  // Fetch friend data and messages
  useEffect(() => {
    getFriend(friendID);

    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch messages from the database
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/messages/${userId}/${friendID}`
        );
        setMessages(response.data.messages); // Set fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [friendID, userId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...(prevMessages || []), newMessage]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Join the room
  useEffect(() => {
    const roomId = [userId, friendID].sort().join("-");
    socket.emit("joinRoom", roomId);

    // Cleanup on unmount
    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [userId, friendID]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Send a new message
  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        id: Date.now().toString(), // Ensure id is unique and a string
        user: userData?.username,
        userImage:
          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
        text: messageInput,
        userId,
        friendID,
      };
      // Emit the message
      socket.emit("sendMessage", newMessage);
      // Clear the input field
      setMessageInput("");
    }
  };

  // Scroll to the bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[70vh] bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-4 text-center font-bold text-3xl text-purple-700">
        Chat
      </div>
      <div className=" px-3 py-1 mt-2 rounded font-bold w-fit text-lg flex items-center">
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
          className="w-10 h-10 rounded-full mr-4 border-2 border-gray-700"
        />
        <p className=" text-2xl text-purple-600">{friendData?.username}</p>
      </div>
      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto bg-gray-800 shadow-md rounded-lg p-4 mt-2">
        {messages?.length > 0 ? (
          <>
            {messages.map((message, index) => (
            <div
            key={message.id || index}
            className={`flex items-start mb-4 ${
              message.user === userData?.username ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Friend's message: Friend's name first */}
              {message.user !== userData?.username && (
                <p className="font-bold text-gray-300 text-xl">
                  {message.user}
                </p>
              )}
          
            
              <p className="bg-gray-700 px-4 py-2 rounded-lg text-lg text-gray-200">
                {message.text}
              </p>  
          
           
              {message.user === userData?.username && (
                <p className="font-bold text-gray-300 text-xl">
                  You
                </p>
              )}
            </div>
          
            <p
              className={`text-gray-500 text-[13px] px-2 mt-1 ${
                message.user === userData?.username ? "self-end ml-4" : "self-end mr-4"
              }`}
            >
              {formatTime(message.timestamp)}
            </p>
          </div>
          
            ))}
          </>
        ) : (
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>

      <div ref={messagesEndRef} />

      {/* Input Section */}
      <div className="flex items-center mt-4 p-4 bg-gray-800 shadow-md">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
