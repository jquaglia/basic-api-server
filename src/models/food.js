'use strict';

class FoodInterface {
  
  constructor() {
    this.id = 0;
    this.db = [];
  }

  // find a food from the 'db'
  read(id) {
    if(id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  // add a new food to the 'db'
  create(obj) {
    let record = {
      id: this.id += 1,
      data: obj,
    };

    this.db.push(record);
    return record;
  }

  // search for a food, and modify that food
  update(id, obj) {
    for(let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  // search for a food and remove
  delete(id) {
    for(let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        delete this.db[i];
      }
    }
  }

}

module.exports = FoodInterface;