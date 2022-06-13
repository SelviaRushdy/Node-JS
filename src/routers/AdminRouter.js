const express = require('express');
const { Session } = require('inspector');
const AdminRouter=express.Router();
const products=require('../data/products.json');
const debug = require('debug')('app:AdminRouter');
const {MongoClient}=require('mongodb');
const { async } = require('rxjs');

AdminRouter.route('/').get((req,res)=>{
    const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
    const dbName='Globomantics';
    (async function mongo(){
        let client;
        try{
            client=await MongoClient.connect(url);
            debug('connect to mongo db');
            const db=client.db(dbName);
             const response=await db.collection('products').insertMany(products);
             res.json(response);

        }
        catch(error) {
            debug(error.stack);
        }

    }());
});

module.exports=AdminRouter
