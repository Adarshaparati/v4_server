const mongoose = require('mongoose');

const teamResponseSchema = new mongoose.Schema({
  teamTitle: { type: String, default: '' },
  name1: { type: String, default: '' },
  designationTitle1: { type: String, default: '' },
  experience1: { type: String, default: '' },
  linkedin1: { type: String, default: '' },
  image1: { type: String, default: '' },
  name2: { type: String, default: '' },
  designationTitle2: { type: String, default: '' },
  experience2: { type: String, default: '' },
  linkedin2: { type: String, default: '' },
  image2: { type: String, default: '' },
  name3: { type: String, default: '' },
  designationTitle3: { type: String, default: '' },
  experience3: { type: String, default: '' },
  linkedin3: { type: String, default: '' },
  image3: { type: String, default: '' },
  name4: { type: String, default: '' },
  designationTitle4: { type: String, default: '' },
  experience4: { type: String, default: '' },
  linkedin4: { type: String, default: '' },
  image4: { type: String, default: '' },
  name5: { type: String, default: '' },
  designationTitle5: { type: String, default: '' },
  experience5: { type: String, default: '' },
  linkedin5: { type: String, default: '' },
  image5: { type: String, default: '' },
  name6: { type: String, default: '' },
  designationTitle6: { type: String, default: '' },
  experience6: { type: String, default: '' },
  linkedin6: { type: String, default: '' },
  image6: { type: String, default: '' }
});

module.exports = teamResponseSchema;
