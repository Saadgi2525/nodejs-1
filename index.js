const express = require('express');
const bodyParser = require('body-parser'); // Require body-parser
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = require('./Schema/user');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/Workshop')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/register', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = mongoose.model('User', UserSchema);
        const user = new User({ username: name, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

const User = mongoose.model('User', UserSchema);

app.listen(PORT, () => {
    console.log(`Application started at port ${PORT}`);
});
