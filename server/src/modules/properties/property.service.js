import prisma from "../../config/prisma.js";

export const createProperty = async (data, userId) => {
  return prisma.property.create({
    data: {
      name: data.name,
      icalUrl: data.icalUrl || null,
      userId,
    },
  });
};

export const getProperties = async (userId, page = 1, limit = 10) => {
  return prisma.property.findMany({
    where: {
      userId,
      deletedAt: null,
    },

    skip: (page - 1) * limit,

    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPropertyById = async (id, userId) => {
  return prisma.property.findFirst({
    where: {
      id,
      userId,
      deletedAt: null,
    },
  });
};

export const updateProperty = async (id, data, userId) => {
  await verifyOwnership(id, userId);

  return prisma.property.update({
    where: {
      id,
    },

    data: {
      name: data.name,
      icalUrl: data.icalUrl,
    },
  });
};

export const deleteProperty = async (id, userId) => {
  await verifyOwnership(id, userId);

  return prisma.property.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),
    },
  });
};

export const verifyOwnership = async (propertyId, userId) => {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      userId,
      deletedAt: null,
    },
  });

  if (!property) {
    throw new Error("Logement introuvable");
  }

  return property;
};
