const express = require("express");
const app = express();
const port = process.env.PORT || "8000";
const connectToDb = require('./db/Connection');
const cors = require('cors')

const reportRoute = require('./Routes/report');
const unionRoute = require('./Routes/union');
const lookupRoute = require('./Routes/lookup');

app.use(cors())
app.use(express.json({ extended: false }))
connectToDb();

app.get("/", (req, res) => {
    res.status(200);
}); 

app.use('/report', reportRoute);
app.use('/union', unionRoute);
app.use('/lookup', lookupRoute);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;