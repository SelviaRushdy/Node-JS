const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path=require('path');
const AdminRouter=require('./src/routers/AdminRouter');
const authRouter=require('./src/routers/authRouter');
const productsRouter=require('./src/routers/productsRouter');
const productRouter=require('./src/routers/productRouter');
const registrationRouter=require('./src/routers/registrationRouter');
const addProductRouter=require('./src/routers/addProductRouter');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port=server.listen(process.env.PORT || 3000);
const app=express();

app.use(morgan('combined'));
//app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({ secret: 'globomantics' }));

require('./src/config/passport.js')(app);

app.set('views','./src/views');
app.set('view engine','ejs');  


app.use('/admin',AdminRouter)
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);
app.use('/registerion', registrationRouter);
app.use('/addProduct', addProductRouter);



// app.get('/',(req,res)=>{
//     res.send('Hello App');

// })

app.get('/',(req,res)=>{
    res.render('index',{title:'Home',data:['a','b','c']});

})


app.listen(port,()=>{
    console.log(`Listening to port${chalk.green(port)}`);
})
