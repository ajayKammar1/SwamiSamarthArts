const User = require("../Modules/User");

const Register = async (req, res) => {
  try {
    const { UserID, password, role } = req.body;

    // Check if the UserID already exists
    const existingUser = await User.findOne({ UserID });
    if (existingUser) {
      return res.status(400).json({ message: "UserID already exists" });
    }

    // Create a new user
    const newUser = new User({ UserID, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};
const Login = async (req, res) => {
  console.log(req.body);
  try {
    const { UserID, password } = req.body;
    const user = await User.findOne({ UserID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

const Delete = async (req, res) => {
  try {
    const { UserID } = req.body;

    const deletedUser = await User.findOneAndDelete({ UserID });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

const Update = async (req, res) => {
  try {
    const { UserID, newPassword } = req.body;

    // Find user and update password
    const updatedUser = await User.findOneAndUpdate(
      { UserID },
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

module.exports = { Register, Login, Delete, Update };
