const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const debug = "auth-controller";

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    console.log(debug, 10, userId);
    if (!userId) {
      return res.status(200).json({
        loggedIn: false,
        user: null,
        errorMessage: "?",
      });
    }

    const loggedInUser = await User.findOne({ _id: userId });
    console.log(debug, 20, "loggedInUser: " + loggedInUser);

    return res.status(200).json({
      loggedIn: true,
      user: {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        _id: loggedInUser._id,
      },
    });
  } catch (err) {
    console.log(debug, 32, "err: " + err);
    res.json(false);
  }
};

loginUser = async (req, res) => {
  console.log(debug, 38, "loginUser");
  try {
    const { email, password } = req.body;

    console.log(debug, 42, email, password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const existingUser = await User.findOne({ email: email });
    console.log(debug, 51, "existingUser: " + existingUser);
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Wrong email or password provided.",
      });
    }

    console.log("provided password: " + password);
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({
        errorMessage: "Wrong email or password provided.",
      });
    }

    // LOGIN THE USER
    const token = auth.signToken(existingUser._id, existingUser.username);
    console.log(debug, 72, "TOKEN:", token);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          username: existingUser.username,
          _id: existingUser._id,
        },
      });
  } catch (err) {
    console.log("ERROR!!");
    res.status(500).send();
  }
};

logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
};

registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, passwordVerify } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordVerify ||
      !username
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    console.log("all fields provided");
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    console.log("password long enough");
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }
    console.log("password and password verify match");

    const existingUser = await User.find().or([
      { email: email },
      { username: username },
    ]);

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("passwordHash: " + passwordHash);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();
    console.log("new user saved: " + savedUser._id);

    // LOGIN THE USER
    const token = auth.signToken(savedUser._id, savedUser.username);
    console.log("token:" + token);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          username: savedUser.username,
          _id: savedUser._id,
        },
      });

    console.log(debug, 186, "token sent");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
};
