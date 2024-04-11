import dotenv from "dotenv";
import connectDB from "./db/index.js";

import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.on("error", () => {
            console.log("Error:", error);
            throw error;
        });

        app.listen(process.env.PORT || 8002, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("mongoDB connection failed !! ", error);
    });

app.get("/", (req, res) => {
    res.send("homepage");
});
