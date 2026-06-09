import * as propertyService from "./property.service.js";

export const create = async (req, res, next) => {
  try {
    const property = await propertyService.createProperty(
      req.body,
      req.user.id,
    );

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const properties = await propertyService.getProperties(
      req.user.id,
      page,
      limit,
    );

    res.json(properties);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const property = await propertyService.getPropertyById(
      req.params.id,
      req.user.id,
    );

    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    await propertyService.verifyOwnership(req.params.id, req.user.id);

    const property = await propertyService.updateProperty(
      req.params.id,
      req.body,
      req.user.id,
    );

    res.json(property);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await propertyService.verifyOwnership(req.params.id, req.user.id);

    await propertyService.deleteProperty(req.params.id, req.user.id);

    res.json({
      message: "Logement supprimé",
    });
  } catch (error) {
    next(error);
  }
};
