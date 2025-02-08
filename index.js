const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

// Endpoint to get items
app.get('/items', (req, res) => {
    res.json(items);
});

// Endpoint to add an item (changed to POST)
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);
        res.status(201).json(items);
    } else {
        res.status(400).json({ message: 'Item is required' });
    }
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
