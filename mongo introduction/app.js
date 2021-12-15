const express = require('express');

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movie")
}

const userSchema = new mongoose.Schema({
    Movie_name: { type: String, required: true },
    movie_genre: { type: String, required: false },
    production_year: { type: Number, required: true, unique: true },
    budget: { type: Number, required: false, default: "Male" },
    
});

const User = mongoose.model("user", userSchema);

const app = express();

app.use(express.json());

app.post("/users", async (req, res)=>{
    const user = await User.create(req.body);
    res.status(201).send(user);
});

app.listen(1234, async function(){
    await connect();
    console.log("listen on port 1234");
});