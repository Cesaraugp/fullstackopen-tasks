const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Note.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

notesRouter.post("/", async (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
      new: true,
    });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
