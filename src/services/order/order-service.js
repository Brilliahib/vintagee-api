const { PrismaClient } = require("@prisma/client");
const uploadImageToCloudinary = require("../upload/upload-cloudinary");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const getAllOrderService = async (userId) => {
  try {
    const result = await prisma.order.findMany({
      where: {
        user_id: userId,
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

const getDetailOrderService = async (id) => {
  try {
    const result = await prisma.order.findUnique({
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

const createOrderService = async (data, file, userId) => {
  try {
    if (!file) {
      throw new Error("Image file is required");
    }

    const publicId = `${Date.now()}`;

    const imageUrl = await uploadImageToCloudinary(file.buffer, publicId);

    const result = await prisma.order.create({
      data: {
        user_id: userId,
        product_id: data.product_id,
        payment_proof_url: imageUrl,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderService = async (file, id) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        payment_proof_url: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (file) {
      const oldImageUrl = order.image_url;
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
    const result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        payment_proof_url: newImageUrl,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRequestOrderService = async (id) => {
  try {
    const result = await prisma.order.findMany({
      where: {
        product: {
          user_id: id,
        },
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

const confirmPaymentOrderService = async (id) => {
  try {
    const result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        is_paid: true,
      },
    });

    if (!result) throw new Error("Order not found");

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteOrderService = async (id) => {
  try {
    const result = await prisma.order.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllOrderService,
  getDetailOrderService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
  confirmPaymentOrderService,
  getRequestOrderService,
};
