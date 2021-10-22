const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('./api/config/env');
const userRoute = require('./api/routes/userRoute');
const inventoryRoute = require('./api/routes/inventoryRoute');

const redis = require('redis').createClient({
	host: env.REDIS_URL,
	port: env.REDIS_PORT,
});

const DATABASE_URL = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_IP}:${env.MONGO_PORT}/quest_inventory?authSource=admin`;
mongoose.connect(DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//?-------Middleware---------------
//? register view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.enable('trust proxy');
app.use('/user', userRoute);
app.use('/inventory', inventoryRoute);
//?----------------------------

app.get('/', (req, res) => {
	res.send('Ok!');
});

app.listen(env.PORT, () => {
	console.log(`listening on ${env.PORT}`);
});
