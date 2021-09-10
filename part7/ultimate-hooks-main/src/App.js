import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  let token;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const update = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    const filtered = resources.filter((el) => el.id !== response.data.id);
    setResources(filtered.concat(response.data));
    return response.data;
  };

  useEffect(() => {
    getAll().then((res) => setResources(res));
  }, []);

  const service = {
    getAll,
    setToken,
    create,
    update,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
