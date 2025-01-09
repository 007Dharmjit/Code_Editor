const mongoose = require("mongoose");

const userdataSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userdataModle = mongoose.model('UserData',userdataSchema);

module.exports = userdataModle;