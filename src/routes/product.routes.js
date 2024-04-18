import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct, getProducts, getProduct, deleteProduct, updateProduct, updateImage } from "../controllers/product.controller.js";
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
router.route("/updateproduct/:id").patch(verifyJWT, updateProduct)
router.route("/updateproductimage/:id").patch(verifyJWT, upload.single("image"), updateImage)


export default router