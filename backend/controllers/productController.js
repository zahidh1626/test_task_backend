import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = Number(process.env.PAGINATION_LIMIT) || 8;
//   const page = Number(req.query.pageNumber) || 1;
//   const keyword = req.query.keyword
//     ? { name: { $regex: req.query.keyword, $options: "i" } }
//     : {};

//   const count = await Product.countDocuments({ ...keyword });
//   const allProducts = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   if (!allProducts.length) {
//     return res.status(404).json({ message: "No products found" });
//   }

//   res.status(200).json({ allProducts, page, pages: Math.ceil(count / pageSize) });
// });

const getProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({})
  res.status(200).json(allProducts);
});

// @desc    Fetch all "active" products
// @route   GET /api/products/active
// @access  Public
const getActiveProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const activeProducts = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!activeProducts.length) {
    return res.status(404).json({ message: "No active products found" });
  }

  res.status(200).json({ activeProducts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, price } = req.body;

  if (!name || !description || !imageUrl || !price) {
    res.status(400);
    throw new Error("All fields (name, description, imageUrl, price) are required.");
  }

  const product = new Product({
    name,
    description,
    imageUrl,
    price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, price } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.imageUrl = imageUrl || product.imageUrl;
  product.price = price || product.price;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: "Product deleted successfully" });
});

export { 
  getProducts, 
  getActiveProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};
