const jwt = require('jsonwebtoken');

const DEFAULT_JWT_ALGORITHM = 'HS256';

function getJwtAlgorithm() {
  return process.env.JWT_ALGORITHM || DEFAULT_JWT_ALGORITHM;
}

function verifyJwt(token, secret, options = {}) {
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  return jwt.verify(token, secret, {
    ...options,
    algorithms: options.algorithms || [getJwtAlgorithm()],
  });
}

function signJwt(payload, secret, options = {}) {
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  return jwt.sign(payload, secret, {
    algorithm: getJwtAlgorithm(),
    ...options,
  });
}

module.exports = {
  verifyJwt,
  signJwt,
  getJwtAlgorithm,
};
