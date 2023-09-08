const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64fab80065d473541cd41fe2')
    .then(user => {
     
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  // next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://harshitaM:va5ptYpFmS8lTMpx@cluster0.uazqkfu.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne()
  .then(user => {
    if(!user) {
      const user = new User({
        name:'Harshita',
        email:'harshita@email.com',
        cart: {
          items: []
        }
      });
      user.save()
    }
  })
  
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})