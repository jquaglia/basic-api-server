'use strict';

class ClothesInterface {
  
  constructor() {
    this.id = 0;
    this.db = [];
  }

  // find a clothes from the 'db'
  read(id) {
    if(id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  // add a new clothes to the 'db'
  create(obj) {
    let record = {
      id: this.id += 1,
      data: obj,
    };

    this.db.push(record);
    return record;
  }

  // search for a clothing item, and modify that clothing item
  update(id, obj) {
    for(let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  // search for a clothes and remove
  delete(id) {
    for(let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        delete this.db[i];
      }
    }
  }

}

module.exports = ClothesInterface;