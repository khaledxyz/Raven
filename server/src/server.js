const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const PORT = 5000;

const app = express();

app.listen(PORT, console.log(`Server live on http://localhost:${PORT}`));
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.log(error));

// * ROUTES * //
app.use('/api', require('./routes/goalsRoutes'));