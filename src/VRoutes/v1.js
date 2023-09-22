'use strict';

const express = require('express');
const dataModules = require('../auth/models/index');

const v1Routes = express.Router();


v1Routes.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

v1Routes.get('/task/:model', handleGetAll);
v1Routes.get('/task/:model/:id', handleGetOne);
v1Routes.post('/task/:model', handleCreate);
v1Routes.put('/task/:model/:id', handleUpdate);
v1Routes.delete('/task/:model/:id', handleDelete);


async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(201).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(204).json(deletedRecord);
}


module.exports = v1Routes;

