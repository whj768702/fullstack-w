const Persons = ({ persons, deletePhone }) => {
  return (
    <ul>
      {persons.map(person => {
        return (
          <div key={person.id}>
            {person.name}  {person.number}
            <button onClick={() => deletePhone(person.id)}>delete</button>
          </div>
        );
      })}
    </ul>
  );
}

export default Persons;