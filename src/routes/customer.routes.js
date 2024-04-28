import { Router } from "express";
import { createCustomer, getCustomers, getSingleCustomer, updateCustomer } from "../controllers/customer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create-customer").post(verifyJWT, createCustomer)
router.route("/getcustomers").get(verifyJWT, getCustomers)
router.route("/getsinglecustomer/:id").get(verifyJWT, getSingleCustomer)
router.route("/updatecustomer/:id").patch(verifyJWT, updateCustomer)

export default router