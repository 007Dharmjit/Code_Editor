const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const userdataModle = require("./Model/user.model");
const UsersFolderModle = require("./Model/folder.model");
const fileModel = require("./Model/file.model");
const Message = require("./Model/Message.model");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

//Connect database
mongoose
  .connect("mongodb://localhost:27017/CodeNest_io")
  .then(() => {
    console.log("DataBase Connected Successfully !");
  })
  .catch((error) => {
    console.log("Error occured =>", error);
  });

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join the room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Joined room: ${roomId}`);
  });

  // Leave the room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`Left room: ${roomId}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async (message) => {
    const roomId = [message.userId, message.friendID].sort().join("-");
    const newMessage = new Message({
      userId: message.userId,
      friendID: message.friendID,
      user: message.user,
      roomId: roomId,
      text: message.text,
      roomId,
    });

    try {
      await newMessage.save();
      // Emit the message to the room
      io.to(roomId).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// API Route to get messages between users
app.get("/api/messages/:userId/:friendID", async (req, res) => {
  try {
    const { userId, friendID } = req.params;
    const roomId = [userId, friendID].sort().join("-");
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

//sign in
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userdataModle.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await userdataModle.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send("Account Created Successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

//User Login
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userdataModle.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send(false);

    // Set the user's online status to true
    user.online = true;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        folders: user.folders,
        friends: user.friends,
        requests: user.requests,
        online: user.online,
      },
      "aPq9!dS@3fT8zX1&mE7o^kP4#tY2wQ5",
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(false);
  }
});

//User logout
app.post("/logout", async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user by ID and update their online status to false
    const user = await userdataModle.findByIdAndUpdate(
      userId,
      { online: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Something went wrong");
  }
});

//Create Folders
app.post("/folder", async (req, res) => {
  const { folderName, userId } = req.body;
  // Check if the Folder already exists
  const existingFolder = await UsersFolderModle.findOne({ userId, folderName });
  if (existingFolder) {
    return res.status(400).send("Folder with this name already exists");
  }
  try {
    const folder = await UsersFolderModle.create({
      folderName,
      userId,
    });
    await userdataModle.findByIdAndUpdate(userId, {
      $push: { folders: folder._id },
    });
    res.status(200).send(folder);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

//get selected friend detail
app.get("/api/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await userdataModle.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data as response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//Add file
app.post("/AddFile", async (req, res) => {
  const { folderId, fileName, Language, fileData, Version } = req.body;
  // Check if the File already exists
  const existingFile = await fileModel.findOne({ folderId, fileName });
  if (existingFile) {
    return res.status(400).send("File with this name already exists");
  }
  try {
    const file = await fileModel.create({
      folderId,
      fileName,
      Language,
      fileData,
      Version,
    });
    await UsersFolderModle.findByIdAndUpdate(folderId, {
      $push: { files: file._id },
    });
    res.status(200).send(file);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Update file or Save file
app.put("/UpdateFile", async (req, res) => {
  const { fileData, _id } = req.body;
  try {
    const file = await fileModel.findByIdAndUpdate(
      _id,
      { fileData },
      { new: true }
    );
    res.status(200).send(file);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route for sending friend requests
app.post("/api/send-request", async (req, res) => {
  const { fromId, toId } = req.body;
  console.log(fromId, toId);
  // Validate input
  if (!fromId || !toId) {
    return res
      .status(400)
      .json({ message: "Both fromId and toId are required." });
  }

  if (fromId === toId) {
    return res
      .status(400)
      .json({ message: "You cannot send a friend request to yourself." });
  }

  try {
    // Find both users in the database
    const sender = await userdataModle.findById(fromId);
    const receiver = await userdataModle.findById(toId);

    if (!sender || !receiver) {
      return res.status(404).json("Sender or receiver not found.");
    }

    // Check if a friend request already exists
    const existingRequest = receiver.requests.find(
      (request) => request.from.toString() === fromId
    );

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    // Create a new friend request object
    const newRequest = {
      to: toId,
      from: fromId,
      status: "pending",
      timestamp: Date.now(),
    };

    // Add the request to both sender and receiver
    sender.requests.push(newRequest);
    receiver.requests.push(newRequest);

    // Save changes to the database
    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the friend request." });
  }
});

//Accept friend requestt
app.post("/api/accept-request", async (req, res) => {
  const { fromId, toId } = req.body;

  try {
    const fromObjectId = new mongoose.Types.ObjectId(fromId);
    const toObjectId = new mongoose.Types.ObjectId(toId);

    console.log(
      "Accepting friend request from:",
      fromObjectId,
      "to:",
      toObjectId
    );

    // Add `fromId` to the `toId` user's friends array
    await userdataModle.updateOne(
      { _id: toObjectId },
      { $push: { friends: fromObjectId } }
    );

    // Add `toId` to the `fromId` user's friends array
    await userdataModle.updateOne(
      { _id: fromObjectId },
      { $push: { friends: toObjectId } }
    );

    // Remove the request object from both users
    await userdataModle.updateOne(
      { _id: toObjectId },
      { $pull: { requests: { from: fromObjectId, to: toObjectId } } }
    );
    await userdataModle.updateOne(
      { _id: fromObjectId },
      { $pull: { requests: { from: fromObjectId, to: toObjectId } } }
    );

    // Fetch the updated user
    const updatedUser = await userdataModle.findById(toObjectId);

    // Generate a new token with updated friends and requests
    const token = jwt.sign(
      {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        folders: updatedUser.folders,
        friends: updatedUser.friends,
        requests: updatedUser.requests, // Updated requests
      },
      "aPq9!dS@3fT8zX1&mE7o^kP4#tY2wQ5",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).send("Error accepting request");
  }
});

//Get all friends data
app.get("/api/get-friends", async (req, res) => {
  const { userID } = req.query;
  try {
    // Fetch the user document by userID
    const user = await userdataModle.findById(userID).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Extract friends array (already populated with full friend details)
    const friendsData = user.friends;
    res.status(200).json(friendsData);
  } catch (error) {
    console.error("Error fetching friends data:", error);
    res.status(500).json({ message: "Error fetching friends data" });
  }
});
//reject friend request
app.post("/api/reject-request", async (req, res) => {
  const { fromId, toId } = req.body;

  try {
    const fromObjectId = new mongoose.Types.ObjectId(fromId);
    const toObjectId = new mongoose.Types.ObjectId(toId);

    console.log("Rejecting request from:", fromObjectId, "to:", toObjectId);

    // Remove the request from the `toId` user's requests array
    await userdataModle.updateOne(
      { _id: toObjectId },
      { $pull: { requests: { from: fromObjectId, to: toObjectId } } }
    );

    // Remove the request from the `fromId` user's requests array
    await userdataModle.updateOne(
      { _id: fromObjectId },
      { $pull: { requests: { from: fromObjectId, to: toObjectId } } }
    );

    // Fetch the updated user details
    const updatedUser = await userdataModle.findById(toObjectId);

    console.log("Updated user requests array:", updatedUser.requests);

    // Generate a new token with the updated user data
    const token = jwt.sign(
      {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        folders: updatedUser.folders,
        friends: updatedUser.friends,
        requests: updatedUser.requests, // Updated requests
      },
      "aPq9!dS@3fT8zX1&mE7o^kP4#tY2wQ5",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).send("Error rejecting request");
  }
});

//fetch all users
app.get("/api/users", async (req, res) => {
  const { useremail } = req.query;

  try {
    // Fetch the logged-in user by email
    const loggedInUser = await userdataModle.findOne({ email: useremail });

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    // Get the list of friends' IDs
    const friendIds = loggedInUser.friends;

    // Fetch all users excluding the logged-in user and those who are friends
    const users = await userdataModle.find({
      email: { $ne: useremail }, // Exclude the logged-in user
      _id: { $nin: friendIds }, // Exclude friends by their IDs
    });

    res.status(200).json(users); // Return the filtered users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

//Get Folders
app.post("/folders", async (req, res) => {
  const { userId } = req.body;
  try {
    const folders = await UsersFolderModle.find({ userId: userId });
    if (!folders) {
      return res.status(404).send("Folder not found");
    }
    res.json(folders);
  } catch (err) {
    console.error("Error fetching folder:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get files by folderId
app.get("/GetFile", async (req, res) => {
  const { id } = req.query; // Get folderId from query parameters

  try {
    // Query the database for files associated with the given folderId
    const files = await fileModel.find({ folderId: id });
    if (!files) {
      return res
        .status(404)
        .json({ message: "No files found for this folder." });
    }
    res.status(200).json(files); // Send the data back as JSON
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Delete Folder From DataBase
app.delete("/deleteFolder", async (req, res) => {
  const { folder_id, userId } = req.query;
  if (!folder_id) {
    return res.status(400).send({ error: "Folder ID is required" });
  }
  try {
    // Delete the folder
    const folderResult = await UsersFolderModle.deleteOne({ _id: folder_id });

    // Delete files associated with the folder
    const filesResult = await fileModel.deleteMany({ folderId: folder_id });

    // Remove the folder ID from the user's folders array
    const userResult = await userdataModle.updateOne(
      { _id: userId },
      { $pull: { folders: folder_id } }
    );
    // Send response
    res.send({
      message: "Folder and associated files deleted successfully",
      folderDeletedCount: folderResult.deletedCount,
      filesDeletedCount: filesResult.deletedCount,
      userUpdatedCount: userResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error deleting folder and files:", error);
    res.status(500).send({
      error: "An error occurred while deleting folder and there files",
    });
  }
});

//Delete File from Database
app.delete("/deleteFile", async (req, res) => {
  const { file_id, folder_id } = req.query;
  if (!file_id) {
    return res.status(400).send(" please click again!");
  }
  try {
    // Delete the file
    const filesResult = await fileModel.deleteOne({ _id: file_id });

    // Remove the file ID from the folder's files array
    const folderResult = await UsersFolderModle.updateOne(
      { _id: folder_id },
      { $pull: { files: file_id } }
    );
    // Send response
    res.send({
      message: " File deleted successfully",
      folderDeletedCount: folderResult.deletedCount,
      filesDeletedCount: filesResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send({
      error: "An error occurred while deleting file",
    });
  }
});

server.listen(3001, () => {
  console.log("Server Start At port 3001");
});
