import { useEffect, useState } from "react";
import axios from 'axios';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('a new person name...');
  const [newPhone, setNewPhone] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showPersons, setShowPersons] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);

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
        setErrorMessage(`${newName}添加成功`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    });
  }
  const updatePhoneInfo = (params) => {
    axios.put(`http://localhost:3001/persons/${params.id}`, params)
      .then(res => {
        if (res.status === 200) {
          getPhonebook();
          setErrorMessage(`${newName}号码更新成功,新号码${newPhone}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
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
    setKeyword(e.target.value);
    const result = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setShowPersons(result);
  }

  const handleDelete = (id) => {
    axios.delete(
      `http://localhost:3001/persons/${id}`,
    ).then(res => {
      if (res.status === 200) {
        getPhonebook();

        setErrorMessage(`${newName}删除成功`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}></Notification>
      <Filter keyword={keyword} handleKeywordChange={handleKeywordChange}></Filter>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}></PersonForm>
      <h2>Number</h2>
      <Persons persons={showPersons} deletePhone={handleDelete}></Persons>
    </div>
  );
}

export default Phonebook;