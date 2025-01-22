const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  online: {
    type: Boolean,
    default: false,
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  requests: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      to: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      status: { type: String, default: "pending" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
