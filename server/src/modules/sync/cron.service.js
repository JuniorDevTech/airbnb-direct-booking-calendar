import cron from "node-cron";

import { syncAllProperties } from "./sync.service.js";

export const startSyncCron = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Airbnb Sync...");

    await syncAllProperties();
  });
};
