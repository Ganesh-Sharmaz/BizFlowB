import mongoose, { mongo, Schema } from "mongoose";

const customerSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        fullname: {
            type: String,
            required: true,
        },
        companyname: {
            type: String,
        },
        receivables: {
            type: String,
        },
        number: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Customer = mongoose.model("Customer", customerSchema);
