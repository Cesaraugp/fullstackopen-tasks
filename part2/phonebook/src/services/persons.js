import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const saveNewPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const personsServices = {
  saveNewPerson,
};
export default personsServices;
