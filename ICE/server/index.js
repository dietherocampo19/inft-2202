import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define the POST route for /api/animals
app.post('/api/animals', (req, res) => {
    const newAnimal = req.body; // Get data from request body
    console.log("Received new animal:", newAnimal);
    
    res.status(201).json({
        message: "Animal added successfully!",
        animal: newAnimal
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


