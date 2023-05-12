const mongoose = require("mongoose");


const diagnosisSchema = mongoose.Schema(
  {
    
    diagnosis_code: { type: "String", required: true, },
    diagnosis_disease: { type: "String", required: true },
       
  },
  { timestamps: true }
);


const diagnosis = mongoose.model("diagnosis", diagnosisSchema);

module.exports = diagnosis;