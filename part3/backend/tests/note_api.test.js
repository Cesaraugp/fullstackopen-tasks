const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app.js");
const api = supertest(app);
const Note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
},7000);

describe("Checking the endpoints", () => {
  test("Checking that the get endpoint is available", async () => {
    await api
      .get("/api/notes/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("A valid note can be added", async () => {
    const note = {
      content: "Async await calls test",
      important: true,
    };
    await api
      .post("/api/notes")
      .send(note)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((r) => r.content);
    expect(contents).toContain("Async await calls test");
  }, 7000);
});

describe("notes Content", () => {
  test("there are five notes", async () => {
    const response = await api.get("/api/notes/");

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("the first note is about HTML", async () => {
    const response = await api.get("/api/notes");
    expect(response.body[0].content).toBe("HTML is easy");
  });

  test("a specific note within the returned notes", async () => {
    const response = await api.get("/api/notes");
    const { body: notes } = response;
    const contents = notes.map((r) => r.content);
    expect(contents).toContain("Browser can execute only Javascript");
  });

  test("note without content is not added", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note can be viewed", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];
    console.log(noteToView);
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test("a note can be deleted", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];
    console.log(noteToDelete.id)
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(() => {
  mongoose.connection.close()
})