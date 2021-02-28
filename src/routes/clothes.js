'use strict';

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator.js');

const ClothesInterface = require('../models/clothes.js');
const ClothesModel = require('../models/data-collection-class.js');
const clothesController = new ClothesInterface(ClothesModel.clothesExport);

router.get('/clothes', getClothes);
router.get('/clothes/:id', validator, getClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);


async function getClothes(req, res, next) {
  const id = req.params.id;
  const clothes = await clothesController.read(id);
  res.json(clothes);
}

async function createClothes(req, res, next) {
  const clothesObj = req.body;
  const newFood = await clothesController.create(clothesObj);
  res.json(newFood);
}

async function updateClothes(req, res, next) {
  const id = req.params.id;
  const clothesObject = req.body;
  let resObject = await clothesController.update(id, clothesObject);
  res.json(resObject);
}

async function removeClothes(req, res, next) {
  const id = req.params.id;
  let resObject = await clothesController.delete(id);
  res.json(resObject);
}

module.exports = router;