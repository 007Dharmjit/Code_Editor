const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const mongoos = require("mongoose");
const userdataModle = require("./Model/user");

app.use(express.json());
app.use(cors());

//Connect database

mongoos
  .connect("mongodb://localhost:27017/CodeNest_io")
  .then(() => {
    console.log("DataBase Connected Successfully !");
  })
  .catch((error) => {
    console.log("Error occured =>", error);
  });

app.get("/", (req, res) => {
  res.send("server running !");
});

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

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdataModle.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send(false);
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      "aPq9!dS@3fT8zX1&mE7o^kP4#tY2wQ5",
      { expiresIn: "1h" } // Token valid for 1 hour
    );
    // res.cookie("token",token)
    res.json({ token });
  } catch (error) {
    res.status(500).send(false);
  }
});

app.listen(3001, () => {
  console.log("Server Start At port 3001");
});
