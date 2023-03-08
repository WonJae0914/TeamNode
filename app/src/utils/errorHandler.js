function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    if (err.status === 400) {
      res.status(400).send({ message: '잘못된 요청입니다.' });
    } else if (err.status === 404) {
      res.status(404).send({ message: '찾을수 없습니다.' });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  module.exports = errorHandler;