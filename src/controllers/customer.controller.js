import { Customer } from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCustomer = asyncHandler(async (req, res) => {
    const { fullname, companyname, receivables, email, number } = req.body;
    console.log(req.body);
    if (!fullname || !email) {
        throw new ApiError(400, "Fullname and email is required");
    }

    const customer = await Customer.create({
        user: req.user.id,
        fullname,
        companyname,
        number,
        receivables,
        email,
    });

    res.status(201).json(
        new ApiResponse(200, customer, "Customer created successfully")
    );
});

const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find({ user: req.user.id }).sort(
        "-createdAt"
    );
    console.log(req.user.id);
    res.status(200).json(customers);
    for (const customer of customers) {
        console.log(customer);
    }
});

const getSingleCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("customer not found");
    }
    // Match customer to its user
    if (customer.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json(customer);
});

const updateCustomer = asyncHandler(async (req, res) => {
    const { fullname, number, receivables, companyname } = req.body;
    const { id } = req.params.id;

    const customer = Customer.findById(id);

    if (!customer) {
        res.status(401);
        throw new ApiError(400, "Customer not found");

    }
    if (customer.user.toString() !== req.user.id) {
        res.status(401);
        throw new ApiError("User not authorized");
    }

    
});

export { createCustomer, getCustomers, getSingleCustomer, updateCustomer };
