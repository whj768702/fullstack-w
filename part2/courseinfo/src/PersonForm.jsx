const PersonForm = ({ handleSubmit, newName, handleNameChange, newPhone, handlePhoneChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone: <input type="text" value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;