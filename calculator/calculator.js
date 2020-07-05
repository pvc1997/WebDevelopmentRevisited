const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/', (req, res) => {

    const n1 = parseFloat(req.body.weight);
    const n2 = parseFloat(req.body.height);

    res.send(`Your BMI is ${(n1/(n2*n2)).toFixed(2)}`);
});


app.listen(3000, () => {
    console.log('Server started at 3000');
});