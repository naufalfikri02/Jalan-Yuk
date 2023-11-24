// Happy coding guys
const express = require('express')
const SESSION = require('express-session')
const app = express()
const port = 3000
const routes = require("./routes/index");

app.use(SESSION({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// csskk