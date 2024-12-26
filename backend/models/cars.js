const mongoose = require('mongoose');

// Define the CarOption schema
const carOptionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0 
  },
  wheelers: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value for wheelers'
    }
  }
}, {
  timestamps: true 
});

// Create the CarOption model
const CarOption = mongoose.model('CarOption', carOptionSchema);

module.exports = CarOption;
