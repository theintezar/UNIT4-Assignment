const express = require('express');

const mongoose = require('mongoose');

//const users = require('./Express/users.json');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/myDAta")
}

//1--connect to mongodb server 
//2--create schema for our data
//3--create a model from the schema

// its a blue print
const userSchema = new mongoose.Schema(
    {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
//budget: {type: Number, required: false, default: 20000}
},
{
    versionKey: false,  
}
);

// section Schema
const sectionSchema = new mongoose.Schema(
    {
      section: { type: String, required: true },
    },
    {
      versionKey: false,
    }
  );

  // Book Schema
  const bookSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, unique: true },
      body: { type: String, required: true },
      author: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "authors",
          required: true,
        },
      ],
      section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },
  
      CheckedOut: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "checkedOut",
      },
    },
    {
      versionKey: false,
    }
  );

  // CheckedOut Schema
const checkedOutSchema = new mongoose.Schema(
    {
      book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true,
        unique: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  // Author Schema
  const authorSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true, unique: true },
      last_name: { type: String, required: true },
    },
    {
      versionKey: false,
    }
  );

//step3
 const User = mongoose.model("user", userSchema); //it created users like how to insert data in mongodb

 const Section = mongoose.model("section", sectionSchema);

 const Book = mongoose.model("books", bookSchema);

 const CheckedOut = mongoose.model("checkedOut", checkedOutSchema);

 const Author = mongoose.model("authors", authorSchema);



const app = express();

app.use(express.json());

// app.post("/users", async (req, res)=>{
//     const user = await User.create(req.body);
//     res.status(201).send(user);
// });


//1--USER CRUD 

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

//2--Author CRUD

app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send(author);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();

    return res.send({ authors });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();

    return res.send(author);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.patch("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(author);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(author);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

//3--Books CRUD 

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author").lean().exec();

    return res.send({ books });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();

    return res.send(book);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(book);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(book);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

// find books that are checked out

app.get("/booksCheck", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
   
   let  bookArr = [];
   for(let i=0 ; i < books.length ; i++) {
    if(books[i].CheckedOut) {
     bookArr.push(books[i]);    
    }   
  } 
  return res.status(200).send(bookArr);

  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});


//find all books written by an author

app.get("/books/author/:id", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.id })
      .populate("author")
      .lean()
      .exec();

    return res.status(200).send({ books });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});


// find books in a section

app.get("/books/section/:id", async (req, res) => {
  try {
    const books = await Book.find({ section: req.params.id })
      .populate("author")
      .lean()
      .exec();

    return res.status(200).send({ books });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});


// find books in a section that are not checked out 

app.get("/books/sectionNot/:id", async (req, res) => {
  try {
    const books = await Book.find({ section: req.params.id }).lean().exec();

    const checkout = await CheckedOut.find().lean().exec();

    var bookArr = [];
    for (var j = 0; j < books.length; j++) {
      let found = false;
      for (var i = 0; i < checkout.length; i++) {
        if (checkout[i].book_id.toString() === books[j]._id.toString()) {
          found = true;
          break;
        }
      }
      if (!found) {
        bookArr.push(books[j]);
      }
    }

    return res.status(200).send(bookArr);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});



// find books of 1 author inside a section

app.get("/books/:sec/:aut", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sec);

    const author = await Author.findById(req.params.aut);

    const books = await Book.find({"section":section._id,"author":author._id}).lean().exec();

    return res.status(200).send({ books });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});


//4--Section CRUD

app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();

    return res.send({ sections });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();

    return res.send(section);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.patch("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(section);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.delete("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(section);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

//5--CheckedOut CRUD ------------------------------

app.post("/checkouts", async (req, res) => {
  try {
    const checkout = await CheckedOut.create(req.body);

    return res.status(201).send(checkout);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/checkouts", async (req, res) => {
  try {
    const checkouts = await CheckedOut.find()
      .populate("user_id")
      .populate("book_id")
      .lean()
      .exec();

    return res.send({ checkouts });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.get("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findById(req.params.id).lean().exec();

    return res.send(checkout);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.patch("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(201).send(checkout);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.delete("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(checkout);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: "Fail" });
  }
});

app.listen(1234, async function(){
    await connect();
    console.log("listen on port 1234");
});










