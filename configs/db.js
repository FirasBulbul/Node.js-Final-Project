// const mongoose = require('mongoose');
// require('dotenv').config();

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.k74l74o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// const connection = () => {
//     mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log("Successfully connected to database");
//     }).catch((error) => {
//         console.log("database connection failed");
//         console.error(error);
//         process.exit(1);
//     });
// };

// connection();

// module.exports = { connection };



const mongoose = require('mongoose')
const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log('Successful Connection')
    }catch (error){
        console.log(error)
        process.exit(1)
    }

}

connection();

module.exports = connectDB;