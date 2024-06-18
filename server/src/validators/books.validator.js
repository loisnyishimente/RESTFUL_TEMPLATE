import Joi from 'joi';
import { errorResponse } from '../utils/api.response.js';

export async function validateBook(req, res, next) {
  try {
    const schema = Joi.object({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
      author: Joi.string().required(),
      publisher: Joi.string().required(),
      publicationYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
      subject: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.details[0].message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
