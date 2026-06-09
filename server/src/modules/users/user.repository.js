import prisma from "../../config/prisma.js";

export const findById = (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const update = (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const remove = (id) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};
