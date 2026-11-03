function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ error: error.message });
  }
  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;
