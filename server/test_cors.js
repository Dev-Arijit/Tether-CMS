const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(3001, () => {
    console.log('Server running on 3001');
});
