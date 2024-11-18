import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
  };

  const filter = query ? { category: query } : {};

  try {
    const result = await Product.paginate(filter, options);
    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
