const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://clustermongo.ndcjjfy.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&tls=true&tlsCertificateKeyFile=C%3A%5CUsers%5CBalu%5CDownloads%5CX509-cert-5117683847752900836.pem');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to the db'));

db.once('open', function(){
    console.log('Successfully connected to the database.!')
});