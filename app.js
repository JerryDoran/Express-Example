const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// USE EJS TEMPLATE ENGINE.  WHEN WE REQUEST VIEWS THE SERVER WILL LOOK IN
// THE '/VIEWS' FOLDER FOR THEM.
app.set("view engine", "ejs");

// MIDDLEWARE TO HANDLE MY STATIC FILES.   USE THE NEXT FUNCTION TO GO ON TO
// THE NEXT MIDDLEWARE THAT I WANT TO RUN AFTER THIS FUNCTION IS FINISHED
app.use("/assets", express.static("assets"));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

// THIS IS THE HOME ROUTE
app.get("/", (req, res) => {
  // There is no need to add the 'Content-Type' in the response headers
  // because express can figure this out based on the content being sent back
  // from the server.
  // res.send("this is the homepage");
  res.render("index");
});

// CONTACT ROUTE
app.get("/contact", (req, res) => {
  // There is no need to add the 'Content-Type' in the response headers
  // because express can figure this out based on the content being sent back
  // from the server.
  // res.send("this is the contact page");

  res.render("contact", { qs: req.query });
});

app.post("/contact", (req, res) => {
  res.render("contact-success", { data: req.body });
});

app.get("/product/:id", (req, res) => {
  let data = {
    name: "Samsung 300 Controller",
    desc: "High speed data controller for your automation needs",
    features: ["High data transfer", "Robust design", "Smart feedback"]
  };
  res.render("product", {
    id: req.params.id,
    data: data
  });
});

// SET UP A PORT VARIABLE FOR THE SERVER TO LISTEN ON - SPIN UP A SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
