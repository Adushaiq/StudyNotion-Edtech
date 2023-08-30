const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
  title: { type: String },
  timeDuration: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  fileUrl: { type: String },
});

module.exports = mongoose.model("SubSection", SubSectionSchema);
