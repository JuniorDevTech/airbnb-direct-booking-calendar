import prisma from "../../config/prisma.js";

export const getPropertyReservations = async (propertyId) => {
  return prisma.reservation.findMany({
    where: {
      propertyId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
};
