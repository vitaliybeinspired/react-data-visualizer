const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongo_query = require('./routes/queries');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/query', mongo_query);
app.get("/test", function(req, res) {
    res.send("Hello World");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

// start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });
























