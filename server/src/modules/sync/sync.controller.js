import { syncProperty } from "./sync.service.js";

export const sync = async (req, res, next) => {
  try {
    const result = await syncProperty(req.params.id);

    res.json({
      success: true,
      message: "Synchronisation terminée",
      imported: result.imported,
    });
  } catch (error) {
    next(error);
  }
};
