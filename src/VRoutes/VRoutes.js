'use strict';
const express = require('express');
const dataModules = require('../auth/models/index');
const vRoutes = express.Router();
const bearer = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

vRoutes.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// vRoutes.get('/api/:model/v',bearer, v2Handler);
// vRoutes.post('/api/:model/v',bearer,  acl('create'), vCreateHandler);
// vRoutes.put('/api/:model/v/:id',bearer, (req, res, next) => {
//   acl('update')(req, res, next); 
// }, vUpdateHandler);
// vRoutes.delete('/api/:model/v/:id',bearer, acl('delete'), vDeleteHandler);

vRoutes.get('/api/:model/v', v2Handler);
vRoutes.post('/api/:model/v', vCreateHandler);
vRoutes.put('/api/:model/v/:id', vUpdateHandler);
vRoutes.delete('/api/:model/v/:id', vDeleteHandler);


async function v2Handler(req, res) {
  try {
    const tasks = await req.model.get();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve tasks.' });
  }
}


async function vCreateHandler(req, res) {
  try {
    const { text, assignee, difficulty } = req.body;
    const newTask = await req.model.create({ text, assignee, difficulty });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create the task.' });
  }
}

async function vUpdateHandler(req, res) {
  try {
    const taskId = req.params.id; 
    const { text, assignee, difficulty } = req.body;
        const updatedTask = await req.model.update(taskId, { text, assignee, difficulty });
    
    if (updatedTask) {
      res.status(200).json({ message: 'Task updated successfully.' });
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update the task.' });
  }
}

async function vDeleteHandler(req, res) {
  try {
    const taskId = req.params.id; 
    const deletedTask = await req.model.delete(taskId);
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete the task.' });
  }
}




module.exports = vRoutes;