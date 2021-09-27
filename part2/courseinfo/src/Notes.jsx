import { useState } from "react";
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const Notes = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('a new person name...');
  const [newPhone, setNewPhone] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showPersons, setShowPersons] = useState(persons);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find(item => item.name === newName)) {
      window.alert(`${newName} is already added to phonebook.`);
      return;
    }
    const personObj = {
      name: newName,
      date: new Date().toLocaleString(),
      id: persons.length + 1,
      number: newPhone,
    };
    setPersons(persons.concat(personObj));
    setNewName('');
    setNewPhone('');
    // setNotes(pre=> [...pre, e.target.value]);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  }

  const handleKeywordChange = (e) => {
    console.log('showPersons: ', showPersons);
    setKeyword(e.target.value);
    const result = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    console.log('result: ', result);
    setShowPersons(result);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange}></Filter>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}></PersonForm>
      <h2>Number</h2>
      <Persons persons={showPersons}></Persons>
    </div>
  );
}

export default Notes;