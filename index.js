//page d'acceuil du back

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


app.use(bodyParser.json());

if (process.env.MONGODB_URI) {
  // Sur Heroku
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  // En local
  mongoose.connect(
    "mongodb://heroku_9ps8h3t8:6mv00n8tfkq0kmhukkm7apq6vk@ds215338.mlab.com:15338/heroku_9ps8h3t8",
    {
      useNewUrlParser: true
    }
  );
}

// Initialiser les collections
require("./models/user");
require("./models/expense");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

// Activer les routes
app.use(userRoutes);
app.use(expenseRoutes);

app.get("/", (req, res) => {
  res.send(
    [
      `<pre style="line-height: 1.5;margin:auto; text-align:center;font-size: 15;padding-top: 5%" >`,
      `<h2 style="margin: 0" >Certification Le REACTEUR - François LAVAL</h2>`,
      `<b>GET <a href="/">/</a></b>`,
      `return: this help`,
      "",
      `<b>GET <a href="/user">/user</a></b>`,
      `return: an array of all users [{ _id: String, name: String }] `,
      "",
      `<b>GET <a href="/expense">/expense</a></b>`,
      `return: an array of all expenses with user inside by ObjectId [{ _id: String, description: String, amount: Number, user :{ _id: String, name: String } }] `,
      "",
      `<b>POST <a href="/user/create">/user</a></b>`,
      `body:  { name: String}`,
      ``,
      `<b>POST <a href="/expense/create">/expense</a></b>`,
      `body: { userId: String, description: String, amount: Number }`,
      ``,
      `</pre>`
    ].join("\n")
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
