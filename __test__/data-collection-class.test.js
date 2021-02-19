'use strict';

require('@code-fellows/supergoose');

const FoodInterface = require('../src/models/food.js');
const FoodModel = require('../src/models/data-collection-class.js');
const foodController = new FoodInterface(FoodModel.foodExport);
const ClothesInterface = require('../src/models/clothes.js');
const ClothesModel = require('../src/models/data-collection-class.js');
const clothesController = new ClothesInterface(ClothesModel.clothesExport);

describe('testing the model controller', () => {
  it ('should be able to create a valid model', async () => {

    const newFood = await foodController.create({name: 'test', type:'test'});

    expect(newFood.name).toEqual('test');
  });
  it ('should be able to create a valid model', async () => {

    const newClothes = await clothesController.create({name: 'test', type:'test'});

    expect(newClothes.name).toEqual('test');
  });
});
