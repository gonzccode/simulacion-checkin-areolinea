const express = require("express");
const app = express();

const flightsRoutes = require("./routes/flights.routes")

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", flightsRoutes);

app.listen(PORT, () => {
    console.log(`Listen to PORT: ${PORT}`);
});