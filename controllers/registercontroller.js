const { default: mongoose } = require("mongoose");
const register = require("../models/registermodel");
const middleware = require("../models/middleware");
const jwt = require("jsonwebtoken");

//  user   resister

const registeruser = async (req, res) => {
  try {
    const { fullname, email, phone, location, password, confirmpassword } =
      req.body;
    const exist = await register.findOne({ email });
    if (exist) {
      return res.status(400).send("user already exist");
    }
    if (password != confirmpassword) {
      return res.status(403).send("password not match");
    }
    let newuser = new register({
      fullname,
      email,
      phone,
      location,
      password,
      confirmpassword,
    });
    await newuser.save(); // Make sure to await the save operation
    return res.status(200).send("user registered successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

//   user login

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await register.findOne({ email });
    if (!exist) {
      return res.status(400).send("user not exist");
    }
    if (exist.password != password) {
      return res.status(400).send("password invalid");
    }
    let payload = {
      user: {
        id: exist._id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token, id: exist._id }); // Corrected this line
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

// user profile update

const updateuser = async (req, res) => {
  try {
    const { fullname, email, phone, location, password, confirmpassword } =
      req.body;
    const myEmployee = await register.findByIdAndUpdate(
      req.params.id,
      { fullname, email, phone, location, password, confirmpassword },
      { new: true }
    );
    if (!myEmployee) {
      return res.status(404).json({ message: "profile not found" });
    }
    res.status(200).json(myEmployee);
  } catch (error) {
    console.error("There Is An Error", error);

    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user

const deleteuser =
  (middleware,
  async (req, res) => {
    try {
      const deleteemployee = await register.findByIdAndDelete(req.user.id);
      if (!deleteemployee) {
        return res.status(404).json({ message: "user not found" });
      } else {
        res.status(204).json({ message: "Deleted Success fully" });
      }
    } catch (error) {
      console.error("There Is An Error", error);

      res.status(500).json({ message: "Server Error" });
    }
  });

// all users

const allusers = async (req, res) => {
  try {
    let allprofiles = await register.find();
    return res.json(allprofiles);
  } catch {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

// single user

const singleuser = async (req, res) => {
  try {
    let user = await register.findById(req.user.id);
    return res.json(user);
  } catch {}
};

module.exports = {
  registeruser,
  loginuser,
  updateuser,
  deleteuser,
  allusers,
  singleuser,
};