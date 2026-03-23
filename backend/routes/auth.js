const express = require('express');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, teacherCode, phone } = req.body;
    
    // Teacher verification logic
    if (role === 'teacher') {
      if (teacherCode !== 'Teacher 0313') {
        return res.status(400).json({ message: 'Invalid or missing Teacher Verification Code' });
      }
      
      // Create a default Teacher profile for Admin Dashboard visibility
      const newTeacherProfile = new Teacher({
        name,
        role: 'Faculty', // Default designation
        email,
        phone: phone || 'N/A',
        bio: 'Authorized Faculty Member.'
      });
      await newTeacherProfile.save();
    }

    // VERY Basic Hash stand-in (In Prod, use bcrypt)
    const newUser = new User({ name, email, password, role: role || 'student' });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password || user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials or role mismatch' });
    }
    // In Prod, return a JWT token here
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
