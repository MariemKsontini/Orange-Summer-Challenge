const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }, 
  user_id : {
    type : String, 
    required : true
  }
})

module.exports = mongoose.model('Product', productSchema)

