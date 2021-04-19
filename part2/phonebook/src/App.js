import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const inputChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const buttonSubmitHandler = (e) => {
    e.preventDefault();
    const alreadyHasName = persons.some(
      (person) => person["name"].toLowerCase() === newName.toLowerCase()
    );
    if (!alreadyHasName) {
      setPersons([...persons, { name: newName }]);
      setNewName("");
      return;
    }
    alert(`${newName.toLowerCase()} is already on the Phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={inputChangeHandler} />
        </div>
        <div>
          <button onClick={buttonSubmitHandler} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <p key={person.name}>{person.name}</p>;
        })}
      </div>
      ...
    </div>
  );
};

export default App;