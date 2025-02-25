const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const dotenv = require("dotenv");
dotenv.config();
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      roles: role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: `user registered with username ${username}` });
  } catch (err) {
    res.status(500).json({ message: `"something went wrong"` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("body", req.body);
    const user = await User.findOne({ username });
    console.log("user", user);

    if (!user) {
      return res
        .status(404)
        .json({ messaage: `user with ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ismatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: `invalid creadentials` });
    }
    console.log("dotenv", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1H" }
    );
    console.log("token", token);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: `"something went wrong"` });
  }
};

module.exports = {
  register,
  login,
};
