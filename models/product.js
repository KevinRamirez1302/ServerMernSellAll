import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: Array,
  price: Number,
  image: String,
  quantity: Number
})

export const productModel = mongoose.model('Product', productSchema)
