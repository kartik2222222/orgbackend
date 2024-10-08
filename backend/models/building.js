const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  buildingId: { type: String, required: true },
  roofArea: { type: Number, required: true },
  solarPotential: { type: Number, required: true }
});

const Building = mongoose.model('Building', BuildingSchema);

module.exports = Building;



