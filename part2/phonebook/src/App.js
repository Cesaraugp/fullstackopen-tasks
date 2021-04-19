import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const inputChangeHandler = (e) => {
    if (e.target.name === "name") {
      setNewName(e.target.value);
      return;
    }
    setNewPhone(e.target.value);
  };

  const buttonSubmitHandler = (e) => {
    e.preventDefault();
    if (!newName | !newPhone) {
      alert(`Please fill the ${!newName ? "name" : "phone"} field`);
      return;
    }
    const alreadyHasName = persons.some(
      (person) => person["name"].toLowerCase() === newName.toLowerCase()
    );
    const alreadyHasNumber = persons.some(
      (person) => person["phone"].toString() === newPhone
    );

    if (alreadyHasNumber || alreadyHasName)
      alert(
        `${
          alreadyHasName ? newName.toLowerCase() : newPhone
        } is already on the Phonebook`
      );

    if (!alreadyHasName && !alreadyHasNumber) {
      setPersons([...persons, { name: newName, phone: newPhone }]);
      setNewName("");
      setNewPhone("");
      return;
    }
  };

  const searchPersons = (e) => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={searchPersons} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        inputChangeHandler={inputChangeHandler}
        buttonHandler={buttonSubmitHandler}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
      ...
    </div>
  );
};

export default App;
