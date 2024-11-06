const mongoose = require('mongoose');

// Define the schema for storing file details
const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  user: {  // Corrected field name to be more descriptive
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Correctly reference the User model
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', fileSchema);
