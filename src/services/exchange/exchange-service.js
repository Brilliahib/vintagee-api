const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;
const uploadImageToCloudinary = require("../upload/upload-cloudinary");

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const getAllExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        name_product: true,
        image_url_product: true,
        brand_product: true,
        size_product: true,
        condition: true,
        is_accepted: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRequestExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.findMany({
      where: {
        product: {
          user_id: id,
        },
      },
      select: {
        id: true,
        name_product: true,
        image_url_product: true,
        brand_product: true,
        size_product: true,
        condition: true,
        is_accepted: true,
        created_at: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
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

const getAllRequestPendingExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.findMany({
      where: {
        product: {
          user_id: id,
        },
        is_accepted: false,
      },
      select: {
        id: true,
        name_product: true,
        image_url_product: true,
        brand_product: true,
        size_product: true,
        condition: true,
        is_accepted: true,
        created_at: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image_url: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createExchangeService = async (data, file, userId) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  const publicId = `${Date.now()}`;

  const imageUrl = await uploadImageToCloudinary(file.buffer, publicId);

  try {
    const result = await prisma.exchange.create({
      data: {
        user_id: userId,
        product_id: data.product_id,
        name_product: data.name_product,
        image_url_product: imageUrl,
        brand_product: data.brand_product,
        size_product: data.size_product,
        condition: data.condition,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmExchangeService = async (id) => {
  try {
    const result = await prisma.exchange.update({
      where: {
        id,
      },
      data: {
        is_accepted: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllExchangeService,
  getDetailExchangeService,
  createExchangeService,
  deleteExchangeService,
  createExchangeService,
  getAllRequestExchangeService,
  confirmExchangeService,
  getAllRequestPendingExchangeService,
};
