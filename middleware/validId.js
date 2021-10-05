const debug = require('debug')('app:server');
const debugError = require('debug')('app:error');
const express = require('express');
const { nanoid } = require('nanoid');
const config = require('config');
const dbModule = require('./database');
const validId = require('../../route/api/pet');

const { ObjectId } = require('mongodb');

const validId = (paramName) => {
  return (req, res, next) => {
    try {
      req[paramName] = new ObjectId(req.params[paramName]);
      return next();
    } catch (err) {
      return res.status(404).json({ error: `${paramName} was not a valid ObjectId.` });
    }
  };
};

module.exports = validId;