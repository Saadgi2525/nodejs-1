const express = require('express');
const path = require('path'); 

app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/', (req, res) => {
    // Assuming you have a User model and MongoDB/Mongoose configured
    const { name, email, password } = req.body;
    // Create a new user record in your database
    // Example using Mongoose
    const newUser = new User({ name, email, password });
    newUser.save()
        .then(() => {
            // Redirect to the dashboard of your e-commerce website upon successful registration
            res.redirect('https://your-ecommerce-website.com/dashboard');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Registration failed');
        });
});

app.listen(PORT, () => {
    console.log(`Application started at port ${PORT}`);
});
