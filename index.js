const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require('./models/Transaction.js')

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.get("/api/test" , (req,res) => {
    res.json("app is working !");
});

main()
.then(() => {
    console.log("connection successful..!");
})
.catch((err) => {
    console.log(err)}
);

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/MONEY");
}


app.post("/api/transaction" , async (req,res) => {
    const {name,description,datetime,price} = req.body;
    const NewTransaction = new Transaction({name , description , datetime , price})

    await NewTransaction.save();
    console.log(NewTransaction);
});

app.get('/api/transactions' , async (req,res) => {
    let transactions = await Transaction.find();
    res.json(transactions);
})


app.listen(3001 , () => {
    console.log("app is listening on port 3001")
});