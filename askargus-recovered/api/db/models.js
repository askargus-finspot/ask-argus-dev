const mongoose = require('mongoose');
const { createModels } = require('@askargus/data-schemas');
const models = createModels(mongoose);

module.exports = { ...models };
