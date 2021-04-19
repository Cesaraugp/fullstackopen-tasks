import React from "react";
const Person = ({ name, phone }) => {
  return (
    <p>
      {name} {phone}
    </p>
  );
};
const Persons = ({ filter, persons }) => {
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
                key={person.name}
                name={person.name}
                phone={person.phone}
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
          <Person key={person.name} name={person.name} phone={person.phone} />
        );
      })}
    </>
  );
};

export default Persons;
