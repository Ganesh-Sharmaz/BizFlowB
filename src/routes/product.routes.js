import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, getProducts, getProduct, deleteProduct } from "../controllers/product.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/createproduct").post(
    upload.fields([
        {
            name: "image",  
            maxCount: 1
        }
    ]),verifyJWT,
    createProduct
);

router.route("/getallproducts").get(verifyJWT, getProducts)
router.route("/getproduct/:id").get(verifyJWT, getProduct)
router.route("/deleteproduct/:id").delete(verifyJWT, deleteProduct)


export default router