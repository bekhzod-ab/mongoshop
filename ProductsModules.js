require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to DB")
})

const productSchema = new mongoose.Schema({
    articleNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


const Products = mongoose.connection.model("products", productSchema);

function PrintAll() {
    return new Promise((resolve,reject) => {
        Products.find({})
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
    
};


module.exports = { PrintAll } 