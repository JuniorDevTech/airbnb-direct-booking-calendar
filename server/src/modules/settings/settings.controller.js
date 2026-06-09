import * as settingsService from "./settings.service.js";

export const get = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettings(req.user.id);

    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const settings = await settingsService.updateSettings(
      req.user.id,
      req.body,
    );

    res.json(settings);
  } catch (error) {
    next(error);
  }
};
