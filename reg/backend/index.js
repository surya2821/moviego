const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-url.com' : '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://surya2819:root@cluster0.nmktdxj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        })
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
