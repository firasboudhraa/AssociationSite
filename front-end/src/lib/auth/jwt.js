const jwt = require('jsonwebtoken');
const { errorWrapper } = require('../error/errorWrapper');
const { ERROR_CODES } = require('../error/errorCodes')

exports.generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_DURATION });

exports.generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_DURATION });

exports.authenticateRefreshToken = errorWrapper((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new Error(ERROR_CODES.UNAUTHENTICATED);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) throw new Error(ERROR_CODES.UNAUTHORIZED);
    req.user = user;
    next();
  });
});

exports.authenticateAccessToken = errorWrapper((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new Error(ERROR_CODES.UNAUTHENTICATED);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) throw new Error(ERROR_CODES.UNAUTHORIZED);
    req.user = user;
    next();
  });
});
