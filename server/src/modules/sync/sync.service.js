import prisma from "../../config/prisma.js";
import { parseICalUrl } from "./ical.service.js";

export const syncProperty = async (propertyId) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Logement introuvable");
  }

  if (!property.icalUrl) {
    throw new Error("Aucune URL iCal configurée");
  }

  let events;

  try {
    events = await parseICalUrl(property.icalUrl);
  } catch (error) {
    console.error("Erreur parseICalUrl complète :", error);

    throw error;
  }

  let imported = 0;

  for (const event of events) {
    const exists = await prisma.reservation.findFirst({
      where: {
        externalId: event.externalId,
        propertyId,
      },
    });

    if (exists) continue;

    await prisma.reservation.create({
      data: {
        title: event.title,

        startDate: event.startDate,

        endDate: event.endDate,

        source: "AIRBNB",

        externalId: event.externalId,

        propertyId,
      },
    });

    imported++;
  }

  return {
    imported,
  };
};

export const syncAllProperties = async () => {
  const properties = await prisma.property.findMany({
    where: {
      isActive: true,
      NOT: {
        icalUrl: null,
      },
    },
  });

  for (const property of properties) {
    try {
      await syncProperty(property.id);
    } catch (error) {
      console.error(`Erreur sync ${property.name}`, error.message);
    }
  }
};
