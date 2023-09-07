const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(id,name,email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static findByUserId(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = User;
