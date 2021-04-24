import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsServices from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  };
  useEffect(hook, []);

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
      /* setPersons([...persons, { name: newName, phone: newPhone }]);
      setNewName("");
      setNewPhone("");
      return; */
      personsServices
        .saveNewPerson({ name: newName, phone: newPhone })
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhone("");
          return;
        });
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
