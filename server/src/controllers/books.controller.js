import { successResponse, errorResponse } from '../utils/api.response.js';
import{ Sequelize, DataTypes}from 'sequelize'
import { createSuccessResponse, serverErrorResponse } from '../utils/api.response.js';
import BookModel from '../models/bookmodel.js';
export async function searchBooksByName(req, res) {
  const { name } = req.query;
  try {
    const books = await BookModel.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%` // Use Sequelize's like operator for partial matches
        }
      }
    });

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }

}





export const registerBooks = async (req, res) => {
  try {
    const {
      name,
      author,
      publisher,
   publicationYear,
      subject,
    } = req.body;


    const book = await BookModel.create({
      name,
      author,
      publisher,
      publicationYear,
      subject,
  
    });

    return createSuccessResponse("Book registered successfully", book, res);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(error, res);
  }
};

// book.controller.js

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const options = {
      offset: (page - 1) * limit,
      limit: limit,
  
    };

    const { count, rows: books } = await BookModel.findAndCountAll(options);

    const totalPages = Math.ceil(count / limit);
    const returnObject = {
      data: books,
      currentPage: page,
      totalPages: totalPages,
      totalData: count,
    };

    return successResponse("Books", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
