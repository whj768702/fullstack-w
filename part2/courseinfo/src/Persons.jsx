const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => {
        return (
          <div key={person.id}>{person.name}  {person.number}</div>
        );
      })}
    </ul>
  );
}

export default Persons;