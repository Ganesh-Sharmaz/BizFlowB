import { User } from "../models/user.model.js";
import {sendEmail} from "../utils/sendEmail.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id);
  
    if (!user) {
      res.status(400);
      throw new ApiError("User not found, please signup");
    }
  
    //   Validation
    if (!subject || !message) {
      res.status(400);
      throw new ApiError("Please add subject and message");
    }
  
    const send_to = "process.env.EMAIL_USER";
    const sent_from = "process.env.EMAIL_USER";
    const reply_to = user.email;
    try {
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
  });

  export { contactUs }
  