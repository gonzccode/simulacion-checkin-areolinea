const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    return response.json({
        ok: true,
        message: 'endpoint initial',
        port: PORT
    })
});

app.listen(PORT, () => {
    console.log(`Listen to PORT: ${PORT}`);
});