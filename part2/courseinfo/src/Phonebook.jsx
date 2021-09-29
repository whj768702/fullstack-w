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

  const getPhonebook = () => {
    axios.get(
      'http://localhost:3001/persons',
    ).then(res => {
      setPersons(res.data);
      setShowPersons(res.data);
    });
  }
  useEffect(() => {
    getPhonebook();
  }, []);

  const addPhoneInfo = (info) => {
    axios.post(
      'http://localhost:3001/persons',
      info
    ).then(res => {
      if (res.status === 201) {
        setPersons(persons.concat(res.data));
        setShowPersons(persons.concat(res.data));
        setNewName('');
        setNewPhone('');
      }
    });
  }
  const updatePhoneInfo = (params) => {
    axios.put(`http://localhost:3001/persons/${params.id}`, params)
      .then(res => {
        console.log('put res: ', res);
        if (res.status === 200) {
          getPhonebook();
        }
        // if (res.status === 201) {
        //   setPersons(persons.concat(res.data));
        //   setShowPersons(persons.concat(res.data));
        //   setNewName('');
        //   setNewPhone('');
        // }
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    let confirm = true;
    const existingPhone = persons.find(item => item.name === newName);
    if (existingPhone) {
      confirm = window.confirm(`${newName} 已经被添加，是否更新旧号码?`);
      if (confirm) {
        updatePhoneInfo({ ...existingPhone, number: newPhone })
      }
    } else {
      const personObj = {
        name: newName,
        date: new Date().toLocaleString(),
        number: newPhone,
      };
      addPhoneInfo(personObj);
    }
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

  const handleDelete = (id) => {
    axios.delete(
      `http://localhost:3001/persons/${id}`,
    ).then(res => {
      if (res.status === 200) {
        getPhonebook();
      }
    });

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange}></Filter>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}></PersonForm>
      <h2>Number</h2>
      <Persons persons={showPersons} deletePhone={handleDelete}></Persons>
    </div>
  );
}

export default Phonebook;