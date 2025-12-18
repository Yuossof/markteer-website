import prisma from "./prisma";

export const getCloudinaryConfig = async () => {
  const config = await prisma.cloudinaryConfig.findFirst();
  if (!config) {
    throw new Error("Cloudinary config not found");
  }

  return config;
};
