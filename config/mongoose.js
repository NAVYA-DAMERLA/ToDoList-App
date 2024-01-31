const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/todoDB');

const db= mongoose.connection;

db.on('error',console.error.bind(console,"Error in connection"));
db.once('open',function(){
    console.log("DB CONNECTED SUCCESFULLY");
})
