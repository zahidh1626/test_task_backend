import express from "express";
const router = express.Router();
import {
  getProducts,
  getActiveProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getProducts).post(createProduct);
router.route("/active-products").get(getActiveProducts);


router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put( checkObjectId, updateProduct)
  .delete(checkObjectId, deleteProduct);

export default router;
