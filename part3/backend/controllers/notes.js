const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require('../models/users')

notesRouter.get("/", async (request, response) => {
 const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
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

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})

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
