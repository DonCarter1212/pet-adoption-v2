const Joi = require('joi');
const { ObjectId } = require('mongodb');

const schema = Joi.any()
  .custom((value, helpers) => {
    try {
      if (!value) {
        return helpers.error('any.objectId');
      } else if (typeof value !== 'string' && typeof value !== 'object') {
        return helpers.error('any.objectId');
      } else {
        return new ObjectId(value);
      }
    } catch (err) {
      return helpers.error('any.objectId');
    }
  })
  .rule({
    message: { 'any.objectId': '{#label} was not a valid ObjectId' }
  })
  .required();
const data = null;
console.log(data);

const validateResult = schema.validate(data);
console.log(validateResult);

// new ObjectId('123')
