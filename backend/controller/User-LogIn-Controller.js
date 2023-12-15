const User = require("../model/userModel");

const getAllUsers = async (req, res) => {
  const data = await User.find();
  res.status(200).send(data);
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserFound = await User.findOne({
      email: email,
      password: password,
    });
    if (UserFound !== null) {
      const userData = await User.findOne({ email: email });
      res.status(200).json({ success: `Welcome ${userData.name}` });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  Login,
  getAllUsers,
};
