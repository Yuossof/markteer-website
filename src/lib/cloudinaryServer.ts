import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryConfig } from "./cloudinarySettings";

export const getCloudinary = async () => {
  const config = await getCloudinaryConfig() as unknown as {cloudName: string, apiKey: string, apiSecret: string};
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  });

  return cloudinary;
};
