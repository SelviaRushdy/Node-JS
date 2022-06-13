const express = require('express');
const authRouter=express.Router();
const debug = require('debug')('app:authRouter');
const {MongoClient}=require('mongodb');
const { async } = require('rxjs');
const passport = require('passport');

authRouter.route('/signUp').post((req,res)=>{
   // res.json(req.body);
   const {Name, Password,Email}=req.body;

   const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
   const dbName='Globomantics';

   const authRouter = express.Router();


   
   (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { Name, Password,Email };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      const actualResult = await db.collection('users').findOne({ _id: results.insertedId });
      req.login(actualResult, () => {
        res.redirect('/products');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});



  authRouter.route('/signin').get((req, res) => {
    console.log(req);
    console.log(res);

    res.render('signin');}).post(
      passport.authenticate('local', {
        successRedirect: '/products',
         failureRedirect: '/',
       })
  );
authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

  
module.exports=authRouter
