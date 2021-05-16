import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [notification, setNotification] = useState();
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("/api/persons/").then((response) => setPersons(response.data));
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

    if (alreadyHasNumber || alreadyHasName) {
      if (alreadyHasNumber) {
        alert(`The number ${newPhone} is already registered`);
        return;
      }
      const isUpdate = window.confirm(
        `¿${newName} is already registered on the phonebook, do you want to replace the old number with the new one?`
      );

      if (isUpdate) {
        const person = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        const changedPerson = { ...person, phone: newPhone };
        const { id } = person;
        personsServices.updateNumber(id, changedPerson).then((data) => {
          setPersons(persons.map((p) => (p.id !== id ? p : data)));
        });
      }
    }

    if (!alreadyHasName && !alreadyHasNumber) {
      personsServices
        .saveNewPerson({ name: newName, phone: newPhone })
        .then((response) => {
          setNotification({
            message: `Added ${newName}:${newPhone}`,
            isError: false,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhone("");
          return;
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            isError: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };

  const searchPersons = (e) => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const deletePersonsHandler = (id) => {
    const { name } = persons.find((p) => p.id === id);
    const isDelete = window.confirm(
      `¿are you sure you want to delete ${name}?`
    );
    if (isDelete) {
      personsServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setNotification({
            message: `Information from ${name} has already been removed from the server`,
            isError: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification props={notification} />
      <Filter handleOnChange={searchPersons} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        inputChangeHandler={inputChangeHandler}
        buttonHandler={buttonSubmitHandler}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        deletePersonsHandler={deletePersonsHandler}
      />
      ...
    </div>
  );
};

export default App;
