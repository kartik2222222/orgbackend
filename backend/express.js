













const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Building = require('./models/building'); // Import the Building model

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Save to 'public/uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original filename
  }
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BIPVProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // 30 seconds timeout
});

// API Routes
app.get('/', (req, res) => {
  res.send('BIPV Project API');
});

app.post('/upload-image', upload.single('image'), (req, res) => {
  // Logic to process the uploaded image
  res.json({ imagePath: `/public/uploads/${req.file.filename}` });
});

app.post('/save-area', async (req, res) => {
  try {
    const { buildingId, area } = req.body;
    // Save area to database
    // Assuming you want to update an existing building with this area
    const building = await Building.findOneAndUpdate(
      { buildingId },
      { $set: { solarPotential: area } },
      { new: true, upsert: true } // Create if not exists
    );
    res.json({ success: true, building });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve the 3D model HTML file
app.get('/3d-model', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/3d-model.html'));
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

