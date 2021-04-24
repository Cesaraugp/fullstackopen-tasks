import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const updateNumber = (id, changedPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, changedPerson);
  return req.then((response) => response.data);
};

const saveNewPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(() => {
    console.log("User sucessfully deleted");
  });

  //const requets= axios.put(baseUrl,id);
};

const personsServices = {
  saveNewPerson,
  deletePerson,
  updateNumber,
};

export default personsServices;
