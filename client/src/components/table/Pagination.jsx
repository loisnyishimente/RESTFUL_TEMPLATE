// Example backend API route for fetching paginated books
const express = require('express');
const router = express.Router();
const { Book } = require('../models'); // Import your Book model

// GET paginated books
router.get('/books', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not specified
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Book.findAndCountAll({
      offset,
      limit,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      books: rows,
    });
  } catch (err) {
    console.error('Error fetching paginated books:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
