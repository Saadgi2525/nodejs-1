const express = require('express');
const path = require('path'); 

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Application started at port ${PORT}`);
});
