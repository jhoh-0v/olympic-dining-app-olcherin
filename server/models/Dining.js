const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [String],
});

const diningSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  hours: { type: String, required: true },
  menu: [menuSchema],
}, {
  timestamps: true,
});

const Dining = mongoose.model('Dining', diningSchema);

module.exports = Dining;