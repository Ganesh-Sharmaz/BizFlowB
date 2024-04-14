import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
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

export default router