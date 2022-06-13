const express = require('express');
const productRouter=express.Router();
const debug = require('debug')('app:productRouter');
const {MongoClient,ObjectID}=require('mongodb');



module.exports=productRouter;

