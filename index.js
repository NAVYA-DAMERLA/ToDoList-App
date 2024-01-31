const express = require("express");
const PORT = 8087;

const mongoose = require("./config/mongoose");
const data = require("./models/todoschema");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded("extend:true"));

app.get("/", function (req, res) {
  res.send("I am in Homepage");
});

app.get("/todo", function (req, res) {
  const todos = data.find({}).exec();
  todos
    .then((todo1) => {
      console.log(todo1);
      res.render("todo", { task: todo1 });
    })
    .catch((err) => {
      console.log("Error while fetching data from db");
    });
});

app.post("/add-item", function (req, res) {
  const tododata = new Promise((resolve, reject) => {
    data
      .create({
        description: req.body.description ? req.body.description : "Add a Task",
        category: req.body.category ? req.body.category : "None",
        date: req.body.date ? req.body.date : "No DeadLine",
      })
      .then((newData) => {
        console.log("*** new Data ***");
        resolve(newData);
      })
      .catch((err) => {
        console.log("Error in adding the task" + err);
        reject(err);
      });
  });
  tododata
    .then((newData) => {
      res.redirect("back");
    })
    .catch((err) => {
      console.log("error", err);
    });
});

app.get("/delete-item", function (req, res) {
  var id = req.query;
  var count = Object.keys(id).length;
  var deletePromises = [];
  for (let i = 0; i < count; i++) {
    deletePromises.push(data.findByIdAndDelete(Object.keys(id)[i]));
  }
  Promise.all(deletePromises)
    .then(() => {
      console.log("task(s) deleted successfully");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in deleting data", err);
      return res.redirect("back");
    });
});

app.listen(PORT, function (err) {
  if (err) {
    console.log("Error");
    return;
  }
  console.log("Server is running on " + PORT);
});
