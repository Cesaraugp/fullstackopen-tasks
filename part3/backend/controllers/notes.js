const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
    note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
  }
});

notesRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  await Note.findByIdAndRemove(id);
  response.status(204).end();
   
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
  const savedNote = await note.save();
  res.json(savedNote);
 
});

notesRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important,
  };
  
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
      new: true,
    }); 
    res.json(updatedNote);

});

module.exports = notesRouter;