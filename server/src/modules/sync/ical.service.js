import ical from "node-ical";

export const parseICalUrl = async (url) => {
  console.log("URL reçue :", url);

  const data = await ical.async.fromURL(url);

  const events = [];

  for (const key in data) {
    const event = data[key];

    if (event.type !== "VEVENT") continue;

    events.push({
      externalId: event.uid,
      title: "Airbnb",
      startDate: event.start,
      endDate: event.end,
    });
  }

  return events;
};
