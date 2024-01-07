var express = require("express");
var cors = require("cors");
const db = require('./db')
var router = express.Router();

var port = 9000;

var app = express();
app.use(cors());

app.get("/", function (req, res, next) {
    res.send("API is working properly");
});

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// connect to database
app.get('/get-data', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM test-table');
        res.json(result.rows);
        console.log(`test`);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;