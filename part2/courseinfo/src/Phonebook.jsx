import { useEffect, useState } from "react";
import axios from 'axios';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('a new person name...');
  const [newPhone, setNewPhone] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showPersons, setShowPersons] = useState(persons);

  useEffect(() => {
    axios.get(
      'http://localhost:3001/persons',
    ).then(res => {
      console.log('res: ', res);
      setPersons(res.data);
      setShowPersons(res.data);
    });
  }, []);

  const addPhoneInfo = (info) => {
    axios.post(
      'http://localhost:3001/persons',
      info
    ).then(res => {
      console.log('res 111: ', res);
      if (res.status === 201) {
        setPersons(persons.concat(res.data));
        setShowPersons(persons.concat(res.data));
        setNewName('');
        setNewPhone('');
      }
      // setPersons(res.data);
      // setShowPersons(res.data);
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find(item => item.name === newName)) {
      window.alert(`${newName} is already added to phonebook.`);
      return;
    }
    const personObj = {
      name: newName,
      date: new Date().toLocaleString(),
      number: newPhone,
    };
    addPhoneInfo(personObj);
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

export default Phonebook;