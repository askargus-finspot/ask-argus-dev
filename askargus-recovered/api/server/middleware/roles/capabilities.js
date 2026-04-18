const { generateCapabilityCheck, capabilityContextMiddleware } = require('@askargus/api');
const { getUserPrincipals, hasCapabilityForPrincipals } = require('~/models');

const { hasCapability, requireCapability, hasConfigCapability } = generateCapabilityCheck({
  getUserPrincipals,
  hasCapabilityForPrincipals,
});

module.exports = {
  hasCapability,
  requireCapability,
  hasConfigCapability,
  capabilityContextMiddleware,
};
