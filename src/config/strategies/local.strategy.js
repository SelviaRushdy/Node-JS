const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');



// module.exports=function localStrategy(){
//     passport.use(
//         new Strategy(
//             {
//                 usernameField:'username',
//                 passwordField:'password',
//             },
//             (username,password,done)=>{
//             const user={username,password,name:'selvia'};
//             done(null,user);
//             }
//         )
//     );
// }

module.exports = function localStrategy() {
    passport.use(
      new Strategy(
        {
          usernameField: 'Name',
          passwordField: 'Password',
        },
        (Name, Password, done) => {
          const url='mongodb+srv://dbusers:mc6UbLBNdj2rp65T@globomantics.htrlwzw.mongodb.net?retryWrites=true&w=majority';
          const dbName='Globomantics';
          (async function validateUser() {
            let client;
            try {
              client = await MongoClient.connect(url);
              debug('Connected to the mongo DB');
  
              const db = client.db(dbName);
  
              const user = await db.collection('users').findOne({ Name });
  console.log(user);
              if (user && user.Password === Password) {
                done(null, user);
              } else {
                done(null, false);
              }
            } catch (error) {
              done(error, false);
              console.log(error);

            }
            client.close();
          })();
        }
      )
    );
  };
  