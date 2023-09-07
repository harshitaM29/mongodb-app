const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(id,name,email, cart) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
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

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });
   
    const updatedCart = {items: [{productId: new mongodb.ObjectId(product._id), quantity:1}]};
    const db = getDb();
   return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, 
    { $set: {cart: updatedCart}}
    )
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
