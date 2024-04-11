import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if(!localFilePath) return null

        //upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url)
        console.log(response);


        fs.unlinkSync(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully");
            }
        })
        return response;
        
    } catch (error) {

        fs.unlinkSync(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted successfully");
            }
        });

        console.log("file not uploaded because ", error);
        return null;
        
    }
}

export {uploadOnCloudinary}