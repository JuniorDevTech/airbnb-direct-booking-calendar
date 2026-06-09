import * as userService from "./user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteProfile(req.user.id);

    res.json({
      message: "Compte supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    await changeUserPassword(req.user.id, req.body);

    res.json({
      success: true,
      message: "Mot de passe modifié avec succès",
    });
  } catch (error) {
    next(error);
  }
};
