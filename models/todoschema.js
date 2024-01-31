const mongoose = require('mongoose');
const todoSchemaData = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  category :{
    type: String,
    required :true
  },
  date:{
    type: String,
    required :true
  }
});

const data = mongoose.model('data',todoSchemaData);
module.exports = data;


