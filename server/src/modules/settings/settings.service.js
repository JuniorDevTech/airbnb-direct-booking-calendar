import * as settingsRepository from "./settings.repository.js";
import prisma from "../../config/prisma.js";

export const getSettings = async (userId) => {
  let settings = await prisma.settings.findUnique({
    where: {
      userId,
    },
  });

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        userId,
      },
    });
  }

  return settings;
};

export const updateSettings = async (userId, data) => {
  return prisma.settings.upsert({
    where: {
      userId,
    },

    update: {
      language: data.language,

      timezone: data.timezone,

      syncInterval: data.syncInterval,
    },

    create: {
      userId,

      language: data.language,

      timezone: data.timezone,

      syncInterval: data.syncInterval,
    },
  });
};
