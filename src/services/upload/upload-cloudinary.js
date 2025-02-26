const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: publicId,
        folder: "project",
      },
      (error, result) => {
        if (error) {
          return reject(
            new Error("Failed to upload image to Cloudinary: " + error.message)
          );
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

module.exports = uploadImageToCloudinary;
