var express = require("express");
var cors = require("cors");
var router = express.Router();

var port = 9000;

var app = express();
app.use(cors());

// app.get("/", function(req, res, next) {
//     res.send("API is working properly");
// });

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });

module.exports = app;