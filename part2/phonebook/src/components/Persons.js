import React from "react";
const Person = ({ id, name, phone, deletePerson }) => {
  return (
    <div>
      <p>
        {name} {phone} <button onClick={() => deletePerson(id)}>Delete</button>
      </p>
    </div>
  );
};
const Persons = ({ filter, persons, deletePersonsHandler }) => {
  if (filter !== "") {
    return (
      <>
        {persons.map((person) => {
          if (
            person.name.toLowerCase().includes(filter) ||
            person.phone.toString().includes(filter)
          )
            return (
              <Person
                id={person.id}
                name={person.name}
                phone={person.phone}
                deletePerson={deletePersonsHandler}
              />
            );
          else return false;
        })}
      </>
    );
  }
  return (
    <>
      {persons.map((person) => {
        return (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            phone={person.phone}
            deletePerson={deletePersonsHandler}
          />
        );
      })}
    </>
  );
};

export default Persons;
