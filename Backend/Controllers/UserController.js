import User from '../Models/User.js'
import asyncHandler from '../Middleware/asyncHandler.js'
import bcrypt from "bcrypt"

const createUser = asyncHandler(async (req, res) => {
    const {
      username,
      name,
      email,
      phone,
      password,
      age,
      gender,
      dob,
      address,
      province,
      profilePicture,
    } = req.body;
  
    if (!username || !name || !email || !phone || !password || !age || !gender || !dob || !address || !province) {
      throw new Error('Please fill all the required inputs.');
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User already exists');
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      username,
      name,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
      dob,
      address,
      province,
      profilePicture,
    });
  
    try {
      await newUser.validate();
      await newUser.save();
  
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
        gender: newUser.gender,
        dob: newUser.dob,
        address: newUser.address,
        province: newUser.province,
        profilePicture: newUser.profilePicture,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid User Data', error: error.message });
    }
  });

  const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const isAdmin = (username === "amys123" && password === "amysant3");
  
    if (user.isAdmin !== isAdmin) {
      user.isAdmin = isAdmin;
      await user.save();
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin
    });
  });

  const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
  const getUserByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      dob: user.dob,
      address: user.address,
      province: user.province,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin
    });
  });

  const updateUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.dob = req.body.dob || user.dob;
    user.address = req.body.address || user.address;
    user.province = req.body.province || user.province;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
  
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
  
    const updatedUser = await user.save();
  
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      age: updatedUser.age,
      gender: updatedUser.gender,
      dob: updatedUser.dob,
      address: updatedUser.address,
      province: updatedUser.province,
      profilePicture: updatedUser.profilePicture,
      isAdmin: updatedUser.isAdmin
    });
  });

  const deleteUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
  
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    await user.deleteOne();
  
    res.status(200).json({ message: `User '${username}' has been deleted successfully.` });
  });  
  

  export {createUser, getAllUsers, loginUser, getUserByUsername, updateUser, deleteUser}