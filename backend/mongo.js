const mongoose = require('mongoose');

const url = `mongodb+srv://@127.0.0.1/test?retrywrites=true`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);
const person = new Person({
  id: 1,
  name: 'first',
  number: '111-1'
});

person.save().then(result => {
  console.log('person saved successfully');
  mongoose.connection.close();
});