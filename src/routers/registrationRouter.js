const express = require('express');
const registrationRouter=express.Router();
const debug = require('debug')('app:registrationRouter');
const {MongoClient,ObjectID}=require('mongodb');

registrationRouter.route('/').get((req,res)=>{
    res.render('registerion');

});


module.exports=registrationRouter;

