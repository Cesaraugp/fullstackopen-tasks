import axios from "axios";

const baseUrl = "http://localhost:3000/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id, votes) => {
  const object = { votes };
  const response = await axios.patch(`${baseUrl}/${id}`, object);
  return response.data;
};

const noteService = { getAll, createNew, vote };
export default noteService;
