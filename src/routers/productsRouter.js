const express = require('express');
const products=require('../data/products.json');
const productsRouter=express.Router();
const debug = require('debug')('app:productsRouter');
const {MongoClient,ObjectID}=require('mongodb');

 productsRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });


productsRouter.route('/').get((req,res)=>{
    const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
    const dbName='Globomantics';
    (async function mongo(){
        let client;
        try{
            client=await MongoClient.connect(url);
            debug('connect to mongo db');
            const db=client.db(dbName);
             const products=await db.collection('products').find().toArray();
             console.log(products);
             res.render('products',{products});

        }
        catch(error) {
            debug(error.stack);
        }

    }());
});


productsRouter.route('/:id').get((req,res)=>
    {
     const id=req.params.id;
     const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
     const dbName='Globomantics';
     (async function mongo(){
         let client;
         try{
             client=await MongoClient.connect(url);
             debug('connect to mongo db');
             const db=client.db(dbName);
              const product=await db.collection('products').findOne({_id:new ObjectID(id)});
              res.render('product',{product: product});

         }
         catch(error) {
             debug(error.stack);
         }

     }());
    
 });


productsRouter.route('/ProductByID/:id').get((req,res)=>{

    console.log("ddddd");

    const id=req.params.id;
    console.log(id);
    const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
    const dbName='Globomantics';
    (async function mongo(){
        let client;
        try{
            client=await MongoClient.connect(url);
            debug('connect to mongo db');
            const db=client.db(dbName);
             const product=await db.collection('products').deleteOne({_id:new ObjectID(id) });
             res.redirect('/products');
             
        }
        catch(error) {
            debug(error.stack);
        }

    }());
    
});




module.exports=productsRouter;

