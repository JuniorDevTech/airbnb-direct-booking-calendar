import prisma from "../../config/prisma.js";

export const getStats = async (userId) => {
  const properties = await prisma.property.count({
    where: {
      userId,
      deletedAt: null,
    },
  });

  const reservations = await prisma.reservation.count({
    where: {
      property: {
        userId,
      },
    },
  });

  const blocked = await prisma.reservation.count({
    where: {
      source: "BLOCKED",

      property: {
        userId,
      },
    },
  });

  const activeReservations = reservations - blocked;

  const occupancyRate =
    reservations > 0
      ? Math.round((activeReservations / reservations) * 100)
      : 0;

  return {
    properties,
    reservations,
    blocked,
    occupancyRate,
  };
};

export const getRecentReservations = async (userId) => {
  return prisma.reservation.findMany({
    where: {
      property: {
        userId,
      },
    },

    include: {
      property: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
};
