import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser, logoutUser, refreshAccessToken, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword, updateUserAvatar } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/getuser").get(verifyJWT, getUser)

router.route("/loggedin").get(loginStatus)

router.route("/updateuser").patch(verifyJWT, updateUser)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/change-password").post(verifyJWT, changePassword)

router.route("/forgot-password").post(forgotPassword);

router.route("/resetpassword/:resetToken").post(resetPassword);

export default router