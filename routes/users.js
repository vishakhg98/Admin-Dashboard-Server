const express = require("express");
const router = express.Router();
const Users = require("../model/Users");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await Users.findOne({ email, password });
    if (!userExists) {
      return res.status(403).json({
        status: false,
        message: "Login failed",
      });
    }

    res.status(200).json({
      status: true,
      data: userExists._id,
      message: "Succesfully logged in",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message || "Something went wrong",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "This user email address is already registered",
      });
    }

    const newUser = await new Users({
      name,
      email,
      password,
    });
    newUser.save();
    res.status(200).json({
      status: true,
      message: "Succesfully Registered",
      data: newUser._id,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message || "Something went wrong",
    });
  }
});

router.get("/userdata/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await Users.findOne({ _id: userId });

    if (!userData) {
      return res
        .status(400)
        .json({ status: false, message: "User doesn't exist", data });
    }

    const data = userData.toObject();
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;

    res
      .status(200)
      .json({ status: true, message: "User data fetched succesfully", data });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
