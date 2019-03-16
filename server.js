const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const passport = require('passport');




const app = express();
const db = config.MONGODB_URI;

const userRoutes = require('./api/routes/users.js');
const profileRoutes = require('./api/routes/profiles.js');
const reservationRoutes = require('./api/routes/reservations.js');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

//passport config
require('./config/passport.js')(passport);

//connection to mongoDB
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log('connected to mongoDB'))
.catch(error => console.log(error));


app.get('/', (req, res) => {
    res.send('Server is connected')
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/reservations', reservationRoutes);


const port = config.PORT;

app.listen(port, () => console.log(`Server running on port: ${port}`));