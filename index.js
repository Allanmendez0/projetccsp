const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Cosmos DB
mongoose.connect('YOUR_COSMOS_DB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

// CRUD endpoints
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.post('/items', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.send(item);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
