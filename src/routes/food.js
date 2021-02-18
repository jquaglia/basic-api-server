'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodInterface = require('../models/food.js');
const food = new FoodInterface();

router.get('/food', getFood);
router.get('/food/:id', validator, getFoodById);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id', validator, removeFood);


function getFood(req, res, next) {
  let resObject = food.read();
  res.json(resObject);
}

function getFoodById(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = food.read(id);
  res.json(resObject);
}

function createFood(req, res, next) {
  const foodObject = req.body;
  let resObject = food.create(foodObject);
  res.json(resObject);
}

function updateFood(req, res, next) {
  const id = parseInt(req.params.id);
  const foodObject = req.body;
  let resObject = food.update(id, foodObject);
  res.json(resObject);
}

function removeFood(req, res, next) {
  const id = parseInt(req.params.id);
  let resObject = food.delete(id);
  res.status(204).json(resObject);
}

module.exports = router;