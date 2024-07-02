const mongoose = require("mongoose");
const posts = new mongoose.Schema({
  ownername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  post_no: {
    type: Number,
  },
  town_or_city_name: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  address_with_doorno: {
    type: String,
    required: true,
  },
  rent_or_sale: {
    type: String,
    required: true,
  },
  rent_or_sale_amount: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },

  no_of_bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  non_veg_allowed: {
    type: String,
    required: true,
  },
  Furnishing: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    required: true,
  },
  possession: {
    type: String,
    required: true,
  },
  gated_security: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  posted_on: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  preferred_tenant: {
    type: String,
    required: true,
  },
  Balcony: {
    type: String,
    required: true,
  },
  Age_of_building: {
    type: String,
    required: true,
  },
  power_backup: {
    type: String,
    required: true,
  },
  facing: {
    type: String,
    required: true,
  },
  water_supply: {
    type: String,
    required: true,
  },
  Maintanence: {
    type: String,
    required: true,
  },
  gmaps: {
    type: String,
    required: true,
  },
  pic1: {
    type: String,
    required: true,
  },
  pic2: {
    type: String,
    required: true,
  },
  pic3: {
    type: String,
    required: true,
  },
  pic4: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("property", posts);
