const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "https://moviego-xc7s.vercel.app",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware globally

mongoose.connect('mongodb+srv://surya2819:root@cluster0.nmktdxj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await FormDataModel.findOne({ email });

        if (user) {
            return res.json("Already registered");
        } else {
            const newUser = await FormDataModel.create(req.body);
            return res.json(newUser);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await FormDataModel.findOne({ email });

        if (user) {
            if (user.password === password) {
                return res.json("Success");
            } else {
                return res.json("Wrong password");
            }
        } else {
            return res.json("No records found!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
