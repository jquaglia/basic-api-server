'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const FoodInterface = require('../models/food.js');
const FoodModel = require('../models/data-collection-class.js');
const foodController = new FoodInterface(FoodModel.foodExport);

router.get('/food', getFood);
router.get('/food/:id', validator, getFood);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id', validator, removeFood);


async function getFood(req, res, next) {
  const id = req.params.id;
  const food = await foodController.read(id);
  res.json(food);
}

async function createFood(req, res, next) {
  const foodObj = req.body;
  const newFood = await foodController.create(foodObj);
  res.json(newFood);
}

async function updateFood(req, res, next) {
  const id = req.params.id;
  const foodObject = req.body;
  let resObject = await foodController.update(id, foodObject);
  res.json(resObject);
}

async function removeFood(req, res, next) {
  const id = req.params.id;
  let resObject = await foodController.delete(id);
  res.json(resObject);
}

module.exports = router;