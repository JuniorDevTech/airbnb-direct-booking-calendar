import prisma from "../../config/prisma.js";

export const findByUserId = (userId) => {
  return prisma.settings.findUnique({
    where: {
      userId,
    },
  });
};

export const create = (data) => {
  return prisma.settings.create({
    data,
  });
};

export const update = (userId, data) => {
  return prisma.settings.update({
    where: {
      userId,
    },
    data,
  });
};
