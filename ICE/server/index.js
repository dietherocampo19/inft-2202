import express from "express";

const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

