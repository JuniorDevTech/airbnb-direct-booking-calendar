import prisma from "../../config/prisma.js";

export const create = (data) => {
  return prisma.reservation.create({
    data,
  });
};

export const findAllByProperty = (propertyId) => {
  return prisma.reservation.findMany({
    where: {
      propertyId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
};

export const findById = (id) => {
  return prisma.reservation.findUnique({
    where: {
      id,
    },
  });
};

export const update = (id, data) => {
  return prisma.reservation.update({
    where: {
      id,
    },
    data,
  });
};

export const remove = (id) => {
  return prisma.reservation.delete({
    where: {
      id,
    },
  });
};
