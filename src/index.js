const express = require("express");

const { PORT } = require('./config/env-config');
const connectDB = require("./config/db-config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(PORT, async () => {
    console.log(`Server is running on PORT: ${PORT}`);
    await connectDB();
})