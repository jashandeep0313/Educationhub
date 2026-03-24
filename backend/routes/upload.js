const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to backend/uploads
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only valid images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const exts = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (exts && mime) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
  fileFilter: fileFilter
});

// @route POST /api/upload
// @desc Upload an image file
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }
    
    // Construct the URL to access the uploaded file
    // Assuming the server runs on the standard expected configuration or proxy
    // /uploads corresponds to the Express static setup in server.js
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.status(200).json({ url: imageUrl, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during upload.', error: error.message });
  }
});

module.exports = router;
