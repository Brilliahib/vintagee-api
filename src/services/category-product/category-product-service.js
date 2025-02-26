const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const getAllCategoryProductService = async () => {
  try {
    const result = await prisma.productCategory.findMany();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCategoryProductService = async (data) => {
  try {
    const result = await prisma.productCategory.create({
      data: {
        name: data.name,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoryProductService = async (id, data) => {
  try {
    const result = await prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategoryProductService = async (id) => {
  try {
    const result = await prisma.productCategory.delete({
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
  disconnectPrisma,
  getAllCategoryProductService,
  createCategoryProductService,
  updateCategoryProductService,
  deleteCategoryProductService,
};
