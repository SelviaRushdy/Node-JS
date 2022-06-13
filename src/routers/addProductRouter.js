const express = require('express');
const addProductRouter=express.Router();
const debug = require('debug')('app:addProductRouter');
const { async } = require('rxjs');
const {MongoClient,ObjectID}=require('mongodb');




addProductRouter.route('/Add').post((req,res)=>{
  
    // res.json(req.body);
    const {Name,description,image}=req.body;
 
    const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
    const dbName='Globomantics';
 
    const authRouter = express.Router();
 
 
    
    (async function addProduct() {
     let client;
     try {
       client = await MongoClient.connect(url);
 
       const db = client.db(dbName);
       const product = { Name, description,image};
       const results = await db.collection('products').insertOne(product);
       debug(results);
       res.redirect('/products');
     } catch (error) {
       debug(error);
     }
     client.close();
   })();
 });

 addProductRouter.route('/Edit/:id').post((req,res)=>{
  
  // res.json(req.body);
  const {Name,description,image}=req.body;

  const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
  const dbName='Globomantics';

  const authRouter = express.Router();


  
  (async function EditProduct() {
   let client;
   try {
    const id=req.params.id;

    console.log(id);

     client = await MongoClient.connect(url);

     const db = client.db(dbName);
     const product = { Name, description,image};
     console.log("edit");
     var myquery = { _id:new ObjectID(id)};
     console.log(myquery);

     var newvalues = { $set: {Name: Name, description: description, image:image} };
     console.log(newvalues);
     const options = { upsert: true };
     const results = await db.collection("products").updateOne(myquery, newvalues,options);
     
     console.log("results");
     res.redirect('/products');
     
     
   } catch (error) {
     debug(error);
   }
   client.close();
 })();
});

 


// addProductRouter.route('/').get((req,res)=>{
//     res.render('addProduct');

// });

addProductRouter.route('/').get((req,res)=>
    {
      console.log("data");

     const id=null;
     const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
     const dbName='Globomantics';
     (async function mongo(){
         let client;
         try{
             client=await MongoClient.connect(url);
             debug('connect to mongo db');
             const db=client.db(dbName);
             console.log("data");

              const addProduct=await db.collection('products').findOne({_id:new ObjectID(id)});
              console.log(addProduct);

              res.render('addProduct',{addProduct: addProduct});

         }
         catch(error) {
             debug(error.stack);
         }

     }());
    
 });


addProductRouter.route('/:id').get((req,res)=>
    {
      console.log("data");

     const id=req.params.id;
     const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
     const dbName='Globomantics';
     (async function mongo(){
         let client;
         try{
             client=await MongoClient.connect(url);
             debug('connect to mongo db');
             const db=client.db(dbName);
             console.log("data");

              const addProduct=await db.collection('products').findOne({_id:new ObjectID(id)});
              console.log("addProduct");

              res.render('addProduct',{addProduct: addProduct});

         }
         catch(error) {
             debug(error.stack);
         }

     }());
    
 });



module.exports=addProductRouter;
