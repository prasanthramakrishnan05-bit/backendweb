const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Atlas connection (replace with your URL)
mongoose.connect(
  "mongodb+srv://prasanth:vasanthxr@cluster0.umb3j0q.mongodb.net/collegeDB"
).then(() => {
  console.log("MongoDB Connected");
});


// 🔹 User Schema (Admin / Student)
const userSchema = new mongoose.Schema({
  userId: String,
  password: String,
  role: String, // "admin" or "student"
});

const User = mongoose.model("User", userSchema);

// 🔹 College Function Schema
const functionSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
});

const CollegeFunction = mongoose.model("CollegeFunction", functionSchema);

// 🟢 SIGNUP API
app.post("/signup", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json("Signup success");
});

// 🟢 LOGIN API
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    res.json({ role: user.role });
  } else {
    res.json("Invalid");
  }
});

// 🟢 ADD FUNCTION (ADMIN ONLY)
app.post("/add-function", async (req, res) => {
  const newFunc = new CollegeFunction(req.body);
  await newFunc.save();
  res.json("Function added");
});

// 🟢 GET FUNCTIONS (ADMIN ONLY)
app.get("/functions", async (req, res) => {
  const data = await CollegeFunction.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});
200
