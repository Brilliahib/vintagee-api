const { PrismaClient } = require("@prisma/client");
const { errorResponse } = require("../../utils/meta");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;
const uploadImageToCloudinary = require("../upload/upload-cloudinary");

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const getAllProductService = async () => {
  try {
    const result = await prisma.product.findMany({
      select: {
        id: true,
        image_url: true,
        name: true,
        price: true,
        size: true,
        condition: true,
        created_at: true,
        user: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProductUserService = async (id) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        image_url: true,
        name: true,
        price: true,
        size: true,
        condition: true,
        created_at: true,
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailProductService = async (id) => {
  try {
    const result = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        image_url: true,
        name: true,
        price: true,
        size: true,
        description: true,
        condition: true,
        brand: true,
        created_at: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image_url: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProductService = async (data, file, user_id) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  const typeId = data.category_id;

  if (!typeId || typeof typeId !== "string") {
    throw new Error("Invalid type_id");
  }

  const publicId = `${Date.now()}`;

  const imageUrl = await uploadImageToCloudinary(file.buffer, publicId);
  try {
    const result = await prisma.product.create({
      data: {
        user_id,
        category_id: data.category_id,
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        size: data.size,
        condition: data.condition,
        brand: data.brand,
        image_url: imageUrl,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductService = async (data, id, file) => {
  try {
    const project = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        image_url: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (file) {
      const oldImageUrl = project.image_url;
      if (oldImageUrl) {
        const publicId = oldImageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const publicId = `${Date.now()}`;
      newImageUrl = await uploadImageToCloudinary(file.buffer, publicId);
    }

    const result = await prisma.product.update({
      where: {
        id,
      },
      data: {
        category_id: data.category_id,
        name: data.name,
        price: data.price,
        description: data.description,
        size: data.size,
        condition: data.condition,
        brand: data.brand,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProductService = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        image_url: true,
      },
    });

    if (!product) {
      return result.status(404).json(errorResponse(null, "Product not found"));
    }

    const imageUrl = project.image_url;
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    await cloudinary.uploader.destroy(publicId);

    const result = await prisma.product.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductByCategoryService = async (categoryId) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        category_id: categoryId,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  disconnectPrisma,
  getAllProductService,
  getDetailProductService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductByCategoryService,
  getAllProductUserService,
};
