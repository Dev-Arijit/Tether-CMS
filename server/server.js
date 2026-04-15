const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/auth-router');


const app = express();

// Updated server/server.js (I have applied this, please push it!)
app.use(cors({
    origin: ["https://tether-cms.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/api/auth', router);

app.get('/', (req, res) => {
    res.send('Sahara CMS API is running...');
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    })})
    .catch(err => {
    console.error('Failed to connect to database', err);
});
