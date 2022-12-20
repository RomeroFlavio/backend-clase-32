// const mongoose = require('mongoose');
// const { option } = require('../moduls/config');
// const User = require('../moduls/Schema/user');

// class Usuario {
//     constructor(){
//         this.#connect();
//     }

//     #connect(){
//         try {
//             const db = mongoose.connect(option.mongo.url, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             });
//             console.log('Database connected.');
//         } catch (error) {
//             return {Error: error};
//         }
//     }

//     async inserUser(user){
//         try {
//             const newUser = new User(user);
//             console.log(newUser)
//             await newUser.save();
//             return {Message: 'User added successfully'};
//         } catch (error) {
//             return {Error: 'User not found'};
//         }
//     }

//     async getUser(email){
//         try {
//             return User.find({"email": email}); 
//         } catch (error) {
//             return {Error: 'User not found'};
//         }
//     }

// }

// const user = new Usuario();

// module.exports = { user };