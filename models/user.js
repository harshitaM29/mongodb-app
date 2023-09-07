const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(name,email, cart,id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then(res => {
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
   let newQuantity = 1;
   const updatedCartItems = [...this.cart.items];

   if(cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
   } else {
    updatedCartItems.push({
      productId: new ObjectId(product._id),
      quantity: newQuantity
    });
   };
   const updatedCart = {
    items: updatedCartItems
  };
  
    const db = getDb();
    console.log("id",this._id)
   return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id)}, 
    { $set: {cart: updatedCart}}
    )
  }
  static findByUserId(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    .then(user => {
      // console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = User;
