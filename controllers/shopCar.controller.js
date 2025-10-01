import { shopCarModel } from '../models/shopCar.model.js';

export const getCar = async (req, res) => {
  await shopCarModel.find({ user: req.user.id }).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

export const deleteItem = async (req, res) => {
  const deleted = await shopCarModel.findByIdAndDelete(req.params.id);

  if (!deleted) return res.status(404).json({ message: 'Product not found' });

  return res.status(203).json({ message: 'User Deleted' });
};

export const addItem = async (req, res) => {
  const { name, description, price, image, quantity } = req.body;
  console.log(req.body);

  const newProduct = new shopCarModel({
    name,
    description,
    price,
    image,
    quantity,
    user: req.user.id,
  });

  await newProduct.save();
  res.send('Product save');
};
